module Github

  class Client

    # Interface for API call
    #   params : [:url, :params]
    # Returns API response

    def initialize(url, params={})
      @url = url
      @params = params
    end

    def find
      @request = Github::Api.new(@url, @params).fetch
    end

  end

end
