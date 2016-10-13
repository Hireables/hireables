require 'httparty'
module Github
  class Api
    attr_accessor :token, :current_developer_id
    include HTTParty
    base_uri 'https://api.github.com'

    def initialize(current_developer_id, token = ENV['github_access_token'])
      @token = token
      @current_developer_id = current_developer_id
      raise StandardError, 'Token is not provided' unless token.present?
    end

    def search(query)
      Rails.cache.fetch(query, expires_in: 2.days) do
        search = api.get("/search/users?q=#{query}", headers: headers)
        raise StandardError, 'Not Found' unless search.headers["status"] == "200 OK"
        JSON.parse(search.body, object_class: OpenStruct)
      end
    end

    def fetch_developers(query)
      Rails.cache.fetch([query, 'developers'], expires_in: 2.days) do
        search(query).items.map do |item|
          fetch_developer(item.login)
        end
      end
    end

    def fetch_hireable_developers(query)
      Rails.cache.fetch([query, 'developers', 'hireables'], expires_in: 2.days) do
        fetch_developers(query).select{ |developer| developer.hireable }
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(login, expires_in: 2.days) do
        if premium?(login)
          Developer.find_by(login: login)
        else
          user = api.get("/users/#{login}", headers: headers)
          raise StandardError, 'Not Found' unless user.headers["status"] == "200 OK"
          JSON.parse(user.body, object_class: OpenStruct)
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch([login, 'languages'], expires_in: 2.days) do
        if premium?(login)
          platforms = Developer.find_by_login(login).platforms
          platforms.empty? ? platforms : platforms[0].split(',')
        else
          repos = api.get("/users/#{login}/repos", headers: headers)
          raise StandardError, 'Not Found' unless repos.headers["status"] == "200 OK"
          repos.map{ |repo| repo['language'] }
        end
      end
    end

    private

    def premium?(login)
      REDIS.sismember('hireables:developers_logins', login)
    end

    def api
      self.class
    end

    def headers
      { "Authorization" => "token #{token}", "User-Agent" => "hireables.co" }
    end
  end
end
