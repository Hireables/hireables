module Github
  class Params
    attr_reader :request, :params
    # Construct params for query
    #   params : request, query_params
    # Returns formatted params for api call

    def initialize(request, params)
      @request = request
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
      popular_params = {
        followers: ">=1000",
        repos: ">=20"
      }

      popular_params.merge!(
        location: request.location.city
      ) unless Rails.env.development? && request.location.city.empty?

      popular_params
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
