module Github

  class Response

    def initialize(request)
      @request = request
    end

    def collection
      @request.parsed_response["items"].map{|u| u["login"]}.map{|username|
        Rails.cache.fetch(["users", username], expires_in: 2.days) do
          Github::Client.new("/users/#{username}", {}).find.parsed_response
        end
      }
    end

    def found?
      @request.headers["status"] == "200 OK"
    end

    def not_found?
      @request.headers["status"] == "404 Not Found"
    end

  end

end