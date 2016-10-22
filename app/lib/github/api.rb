require 'typhoeus/adapters/faraday'
module Github
  class Api
    def search(params)
      Rails.cache.fetch([params[:query], params[:page], 'search']) do
        client.search_users(params[:query], page: params[:page], per_page: 21)
      end
    end

    def fetch_developers(params)
      Rails.cache.fetch([params[:query], params[:page], 'developers']) do
        search(params).items.map do |item|
          fetch_developer(item.login)
        end
      end
    end

    def fetch_hireable_developers(params)
      Rails.cache.fetch([params[:query], params[:page], 'hireables']) do
        fetch_developers(params).select(&:hireable)
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(login) do
        developer = Developer.find_by(login: login)
        if developer.present?
          developer
        else
          client.user(login)
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch([login, 'languages']) do
        developer = Developer.find_by(login: login)
        if developer.present? && !developer.platforms.empty?
          developer.platforms[0].split(',')
        else
          fetch_developer_repos(login).map(&:language).compact.uniq!
        end
      end
    end

    def fetch_developer_repos(login)
      client.auto_paginate = true
      client.repositories(user: login)
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
