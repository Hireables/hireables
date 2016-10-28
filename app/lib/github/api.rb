require 'typhoeus/adapters/faraday'
module Github
  class Api
    def initialize
      Octokit.configure do |c|
        c.middleware = faraday_stack
        c.per_page = 51
        c.access_token = ENV.fetch('github_access_token')
      end
    end

    def search(params)
      Rails.cache.fetch([params[:query], params[:page], 'search']) do
        Octokit.search_users(params[:query], page: params[:page])
      end
    end

    def fetch_developers(params)
      logins = search(params).items.map(&:login)
      local = Developer.where(login: logins)

      github = (logins - local.map(&:login)).map do |login|
        fetch_developer(login)
      end

      [local + github].flatten.sort_by do |item|
        [
          item.premium && item.hireable ? 0 : 1,
          item.hireable ? 0 : 1,
          item.premium ? 0 : 1
        ]
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(login) do
        Octokit.user(login)
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch([login, 'languages']) do
        fetch_developer_repos(login).map(&:language).compact.map(&:downcase).uniq!
      end
    end

    def fetch_developer_repos(login)
      Rails.cache.fetch([login, 'repos']) do
        Octokit.auto_paginate = true
        Octokit.repositories(login)
      end
    end

    private

    def faraday_stack
      Faraday::RackBuilder.new do |builder|
        builder.use :http_cache, store: Rails.cache,
                                 logger: Rails.logger,
                                 shared_cache: false,
                                 serializer: Marshal
        builder.response :logger unless Rails.env.test?
        builder.use Octokit::Response::RaiseError
        builder.request :url_encoded
        builder.request :retry
        builder.adapter :typhoeus
      end
    end
  end
end
