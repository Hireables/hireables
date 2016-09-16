module Github
  class Response
    # Sends formatted/cached response
    #   params : request
    # Returns collection object

    def initialize(request)
      @request = request
    end

    def developers_collection
      @request.parsed_response['items'].map{|u| u['login']}.map do |username|
        developer =  Developer.find_by(login: username)

        if developer.nil?
          Rails.cache.fetch(['developers', username], expires_in: 2.days) do
            request = Github::Api.new("/users/#{username}").fetch
            request.parsed_response
          end
        else
          Rails.cache.fetch(
            ['developers', username, developer.updated_at], expires_in: 2.days
          ) do
            developer
          end
        end
      end
    end

    def hireable_collection
      developers_collection.reject! do |developer|
        developer["hireable"].nil? and !developer["hirable"]
      end
    end

    def developer_languages_collection
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
