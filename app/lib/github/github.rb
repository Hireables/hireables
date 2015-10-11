module Github

  class Client

    attr_reader :request

    def initialize(url, params={})
      @url = url
      @params = params
    end

    def find
      @request = Github::Api.new(@url, @params).fetch
    end

  end

end
