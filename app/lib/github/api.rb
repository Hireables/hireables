require 'httparty'
module Github

  # Handles github API calls based on URI
  #   params : formatted_api_url
  # Returns API response

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
          "User-Agent" => "githubhire"
        }
      end

  end

end
