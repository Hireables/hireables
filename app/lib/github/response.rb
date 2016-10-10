module Github
  class Response
    attr_accessor :request

    def initialize(request)
      @request = request
    end

    def developers_collection
      developers = request.parsed_response['items'].map{ |u| u['login'] }.map do |username|
        Developer.fetch_by_login(username)
      end
    end

    def hireable_collection
      developers_collection.reject! do |developer|
        developer.hireable.nil? && !developer.hireable
      end
    end

    def developer_languages_collection
      request.map do |r|
        Rails.cache.fetch(['language', r['id'], r['updated_at']], expires_in: 2.days) do
          r['language']
        end
      end.compact.uniq!
    end

    def found?
      request.headers["status"] == "200 OK"
    end

    def not_found?
      request.headers["status"] == "404 Not Found"
    end
  end
end
