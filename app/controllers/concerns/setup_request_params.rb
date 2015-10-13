module SetupRequestParams
  extend ActiveSupport::Concern

  included do
    before_action :request_params
  end

  # Setup request param
  def request_params
    # For home route this will be empty so setup popular params
    if member_params.empty?
      popular_params
    else
      # Check if keyword is present in query string
      keyword = member_params["q"].slice!('keyword:')
      query  = keyword.nil? ? member_params["q"] : format_query(member_params["q"])

      # Format page and query param and add it to request params
      {
        page: member_params["page"],
        q: query
      }
    end
  end

  # Generate a cache key based on request params
  def cache_key
    keys = request_params.map{
      |key, value| "#{key}:#{value}" unless value.nil?
    }
    # Join keys
    keys.join
  end

  private

    def format_query(query)
      query.slice!('keyword:')
      query.gsub!(', ', '+')
    end

    # Hard code popular params, would be good to put in ENV vars
    def popular_params
      {
        followers: ">=1000",
        repos: ">=20"
      }
    end

    # Whitelist the params for our controller
    def member_params
      params.permit(:q, :page)
    end

end