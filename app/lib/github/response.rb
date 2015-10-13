module Github

  class Response

    # Sends formatted/cached response
    #   params : request
    # Returns collection object

    def initialize(request)
      @request = request
    end

    def users_collection
      @request.parsed_response["items"].map{|u| u["login"]}.map{|username|
        Rails.cache.fetch(["users", username], expires_in: 2.days) do
          request = Github::Api.new("/users/#{username}").fetch
          request.parsed_response
        end
      }
    end

    def user_languages_collection
      @request.map{|r|
        Rails.cache.fetch(["language", r["id"], r["updated_at"]], expires_in: 2.days) do
          r["language"]
        end
      }.compact.uniq!
    end

    def found?
      @request.headers["status"] == "200 OK"
    end

    def not_found?
      @request.headers["status"] == "404 Not Found"
    end

  end

end