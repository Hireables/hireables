require 'httparty'
module Github
  class Api
    include HTTParty
    base_uri 'https://api.github.com'

    def initialize(url)
      @url = url
    end

    def fetch
      self.class.get(@url,
        headers: headers
      )
    end

    private

    def headers
      {
        "Authorization" => "token #{ENV["github_access_token"]}",
        "User-Agent" => "hireables"
      }
    end
  end
end
