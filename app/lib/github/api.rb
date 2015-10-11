require 'httparty'

module Github
  class Api
    include HTTParty
    base_uri 'https://api.github.com'

    def initialize(url, params)
      @url = url
      @params = params
    end

    def fetch
      self.class.get(api_url,
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

      def api_url
        filters = @params.except(:query, :page).map {|key, value|
          "+#{key}:#{value}"
        }
        @url + filters.join
      end

  end

end
