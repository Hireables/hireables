module Github
  class Api
    def search(params)
      Rails.cache.fetch([params[:cache_key], 'search']) do
        client.search_users(params[:query], page: params[:page], per_page: 21)
      end
    end

    def fetch_developers(params)
      Rails.cache.fetch([params[:cache_key], 'developers']) do
        search(params).items.map do |item|
          fetch_developer(item.login)
        end
      end
    end

    def fetch_hireable_developers(params)
      Rails.cache.fetch(params[:cache_key], 'hireables') do
        fetch_developers(params).select(&:hireable)
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(login, expires_in: 2.days) do
        developer = Developer.find_by(login: login)
        if developer.present?
          Developer.find_by(login: login)
        else
          client.user(login)
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch([login, 'languages'], expires_in: 2.days) do
        developer = Developer.find_by(login: login)
        if developer.present?
          platforms = Developer.find_by_login(login).try(:platforms)
          platforms.empty? ? platforms : platforms[0].split(',')
        else
          fetch_developer_repos(login).map(&:language).uniq!
        end
      end
    end

    def fetch_developer_repos(login)
      Rails.cache.fetch([login, 'repos'], expires_in: 2.days) do
        client.auto_paginate = true
        client.repositories(user: login)
      end
    end

    def client
      client = Octokit::Client.new(
        access_token: ENV.fetch('github_access_token')
      )
      client.configure do |c|
        c.middleware = faraday_stack
      end
      client
    end

    private

    def faraday_stack
      Faraday::RackBuilder.new do |builder|
        builder.use :http_cache, store: Rails.cache,
                                 logger: Rails.logger,
                                 serializer: Marshal,
                                 shared_cache: false
        builder.response :logger unless Rails.env.test?
        builder.use Octokit::Response::RaiseError
        builder.request :url_encoded
        builder.adapter Faraday.default_adapter
      end
    end
  end
end
