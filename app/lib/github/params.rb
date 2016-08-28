module Github
  class Params
    attr_reader :params
    # Construct params for query
    #   params : request, query_params
    # Returns formatted params for api call

    def initialize(params)
      @params = params
    end

    def set
      params_empty? ? set_popular_params : set_query_params
    end

    private

    # Check if params empty?
    def params_empty?
      params.empty?
    end

    # Hard code popular params, would be good to put in ENV vars
    def set_popular_params
      {
        followers: ">=10",
        repos: ">=50"
      }
    end

    def set_query_params
      # Check if keyword is present in query string
      keyword = params["q"].slice!('name:')
      query  = keyword.nil? ? params["q"] : format_keyword_query(params["q"])

      # Format params hash
      {
        page: params["page"],
        q: query
      }
    end

    # Format the query is keyword is present?
    def format_keyword_query(query)
      query.slice!('name:')
      query.gsub!(', ', '+')
    end
  end
end
