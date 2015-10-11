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

  end

end