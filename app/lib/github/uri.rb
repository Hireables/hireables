module Github
  class Uri
    attr_accessor :query, :count
    # Handles API uri selection based on params
    #   params : {query_params}
    # Returns formatted api url

    def initialize(query, count = 20)
      @query = query
      @count = count
    end

    def get
      "/search/users?q=#{query}&per_page=#{count}"
    end
  end
end
