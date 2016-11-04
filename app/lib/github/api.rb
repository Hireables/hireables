require 'typhoeus/adapters/faraday'
module Github
  class Api
    attr_reader :access_token

    def initialize(token = nil)
      @access_token = if token.present?
                        token
                      else
                        ENV.fetch('github_access_token')
                      end
    end

    def search(params)
      Rails.cache.fetch([params[:query], params[:page], 'search']) do
        client.search_users(params[:query], page: params[:page])
      end
    end

    # rubocop:disable Metrics/CyclomaticComplexity
    # rubocop:disable Metrics/MethodLength
    # rubocop:disable Metrics/AbcSize
    def fetch_developers(params)
      logins = {}
      items = search(params).items
      return [] unless items.any?

      items.each do |item|
        logins["developer/#{item.login}"] = item.login
      end

      result = Rails.cache.fetch_multi(logins.keys) do |_key|
        local = Developer.where(login: logins.values)
        remaining = logins.values - local.map(&:login)
        github = remaining.map do |login|
          fetch_developer(login)
        end

        [local + github]
      end[logins.keys].flatten

      # Sort developers based on given criterias
      result.sort_by do |item|
        [
          item.premium && item.hireable ? 0 : 1,
          item.hireable && item.email.present? ? 0 : 1,
          item.hireable ? 0 : 1,
          item.premium ? 0 : 1
        ]
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(['developer', login]) do
        begin
          client.user(login)
        rescue Octokit::NotFound
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch(['developer', login, 'languages']) do
        begin
          languages = fetch_developer_repos(login)
            .lazy
            .map(&:language)
            .to_a
            .compact
            .map(&:downcase)
            .uniq!

          return [] if languages.nil?
          languages
        rescue Octokit::NotFound
          []
        end
      end
    end

    def fetch_developer_repos(login)
      Rails.cache.fetch(['developer', login, 'repos']) do
        client.auto_paginate = true
        begin
          repos = client.repositories(login, sort: 'updated')

          return [] if repos.nil?
          repos
        rescue Octokit::NotFound
          []
        end
      end
    end

    def fetch_developer_orgs(login)
      Rails.cache.fetch(['developer', login, 'organizations']) do
        begin
          orgs = client
            .organizations(login)
            .lazy
            .take(5)
            .to_a

          return [] if orgs.nil?
          orgs
        rescue Octokit::NotFound
          []
        end
      end
    end

    def client
      client = Octokit::Client.new(access_token: access_token)
      client.configure do |c|
        c.middleware = faraday_stack
        c.per_page = 51
      end

      client
    end

    private

    def faraday_stack
      Faraday::RackBuilder.new do |builder|
        builder.response :logger unless Rails.env.test?
        builder.use Octokit::Response::RaiseError
        builder.request :url_encoded
        builder.request :retry
        builder.adapter :typhoeus
      end
    end
  end
end
