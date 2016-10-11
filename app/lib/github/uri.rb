module Github
  class Uri
    attr_accessor :query, :count, :page

    def initialize(query, count, page)
      @query = query
      @count = count
      @page = page
    end

    def get
      URI.encode("/search/users?q=#{query}&per_page=#{count}&page=#{page}")
    end
  end
end
