require 'typhoeus/adapters/faraday'
module Github
  class Api
    def search(params)
      client.search_users(params[:query], page: params[:page], per_page: 21)
    end

    def fetch_developers(params)
      search(params).items.map do |item|
        fetch_developer(item.login)
      end
    end

    def fetch_hireable_developers(params)
      fetch_developers(params).select(&:hireable)
    end

    def fetch_developer(login)
      developer = Developer.find_by(login: login)
      if developer.present?
        Developer.find_by(login: login)
      else
        client.user(login)
      end
    end

    def fetch_developer_languages(login)
      developer = Developer.find_by(login: login)
      if developer.present?
        platforms = Developer.find_by_login(login).try(:platforms)
        platforms.empty? ? platforms : platforms[0].split(',')
      else
        fetch_developer_repos(login).map(&:language).uniq!
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
