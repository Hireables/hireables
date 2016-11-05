require 'typhoeus/adapters/faraday'
module Github
  class Api
    attr_reader :access_token

    def initialize(token = nil)
      @access_token = token.present? ? token : ENV.fetch('github_access_token')
    end

    def search(params)
      Rails.cache.fetch([params[:query], params[:page], 'search']) do
        search = client.search_users(params[:query], page: params[:page])
        search.items.lazy.map(&:login).to_a
      end
    end

    def fetch_developers(params)
      find_developers_by_login(search(params))
    end

    # rubocop:disable Metrics/CyclomaticComplexity
    # rubocop:disable Metrics/PerceivedComplexity
    # rubocop:disable Metrics/MethodLength
    # rubocop:disable Metrics/AbcSize
    def find_developers_by_login(logins)
      return [] unless logins.any?
      logins_hash = {}
      logins.each do |login|
        logins_hash["developer/#{login}"] = login
      end

      result = Rails.cache.fetch_multi(logins_hash.keys) do |_key|
        local = Developer.where(login: logins_hash.values)
        remaining = logins_hash.values - local.map(&:login)
        github = remaining.map do |login|
          fetch_developer(login)
        end

        [local + github]
      end[logins_hash.keys].flatten

      return [] unless result.any?
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
          raise StandardError, 'Not found'
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch(['developer', login, 'languages']) do
        begin
          languages = fetch_developer_repos(login).lazy.map(&:language)
          return [] if languages.nil?
          languages.to_a.compact.map(&:downcase).uniq!
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
          orgs = client.organizations(login).lazy.take(5).to_a
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
