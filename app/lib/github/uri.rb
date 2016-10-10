module Github
  class Uri
    attr_accessor :query, :count, :page

    def initialize(query, count = 20, page = 1)
      @query = query
      @count = count
      @page = page
    end

    def get
      URI.encode("/search/users?q=#{query}&per_page=#{count + 1}&page=#{page}")
    end
  end
end
