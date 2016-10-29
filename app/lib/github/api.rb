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

    def fetch_developers(params)
      logins = search(params).items.map(&:login)
      local = Developer.where(login: logins)
      remanining = logins - local.map(&:login)
      github = remanining.map { |login| fetch_developer(login) }
      sort_developers([local + github])
    end

    def fetch_developer(login)
      Rails.cache.fetch(['developer', login]) do
        client.user(login)
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch(['developer', login, 'languages']) do
        fetch_developer_repos(login)
          .map(&:language)
          .compact
          .map(&:downcase)
          .uniq!
      end
    end

    def fetch_developer_repos(login)
      Rails.cache.fetch(['developer', login, 'repos']) do
        client.auto_paginate = true
        client.repositories(login)
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

    # rubocop:disable Metrics/CyclomaticComplexity
    def sort_developers(developers)
      developers.flatten.sort_by do |item|
        [
          item.premium && item.hireable ? 0 : 1,
          item.hireable && item.email.present? ? 0 : 1,
          item.hireable ? 0 : 1,
          item.premium ? 0 : 1
        ]
      end
    end

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
