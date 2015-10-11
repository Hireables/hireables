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

    def last_response_rels
      Oj.dump(Pagination.new(@request.headers).build)
    end

  end

end
