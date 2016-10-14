require 'httparty'
module Github
  class Api
    attr_reader :token
    include HTTParty
    base_uri 'https://api.github.com'

    def initialize(token)
      @token = token.nil? ? ENV['github_access_token'] : token
      raise StandardError, 'Token is not provided' unless @token.present?
    end

    def search(query)
      Rails.cache.fetch(query, expires_in: 2.days) do
        search = api.get("/search/users?q=#{query}", headers: headers)
        headers = search.headers['status']
        raise StandardError, 'Not Found' unless headers == '200 OK'
        JSON.parse(search.body, object_class: OpenStruct)
      end
    end

    def fetch_developers(query)
      Rails.cache.fetch([query, 'developers'], expires_in: 2.days) do
        search(query).items.map { |item| fetch_developer(item.login) }
      end
    end

    def fetch_hireable_developers(query)
      Rails.cache.fetch(
        [query, 'developers', 'hireables'],
        expires_in: 2.days
      ) do
        fetch_developers(query).select(&:hireable)
      end
    end

    def fetch_developer(login)
      Rails.cache.fetch(login, expires_in: 2.days) do
        if premium?(login)
          Developer.find_by(login: login)
        else
          user = api.get("/users/#{login}", headers: headers)
          headers = user.headers['status']
          raise StandardError, 'Not Found' unless headers == '200 OK'
          JSON.parse(user.body, object_class: OpenStruct)
        end
      end
    end

    def fetch_developer_languages(login)
      Rails.cache.fetch([login, 'languages'], expires_in: 2.days) do
        if premium?(login)
          platforms = Developer.find_by_login(login).try(:platforms)
          platforms.empty? ? platforms : platforms[0].split(',')
        else
          repos = fetch_repos(login)
          repos.map(&:language)
        end
      end
    end

    def fetch_developer_repos(login)
      repos = api.get("/users/#{login}/repos", headers: headers)
      headers = repos.headers['status']
      raise StandardError, 'Not Found' unless headers == '200 OK'
      JSON.parse(repos.body, object_class: OpenStruct)
    end

    private

    def premium?(login)
      REDIS.sismember('hireables:developers_logins', login)
    end

    def api
      self.class
    end

    def headers
      {
        'Authorization' => "token #{token}",
        'User-Agent' => 'hireables.co'
      }
    end
  end
end
