require 'httparty'
module Github

  # Handles github API calls based on URI
  #   params : api_query_uri
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
          "User-Agent" => "techhire"
        }
      end

  end

end
