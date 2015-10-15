module Github

  class Uri

    # Handles API uri selection based on params
    #   params : {query_params}
    # Returns formatted api url

    def initialize(params)
      @params = params
    end

    def get
      return popular_api_url unless query_present?
      paginated? ? paginated_uri : default_uri
    end

    def paginated_uri
      default_uri + "&page=#{@params[:page]}"
    end

    private

      def default_uri
        query  = query_present? ? @params[:q].gsub(' ', '+') : @params[:q]
        "/search/users?q=#{query}"
      end

      def popular_api_url
        filters = @params.map {|key, value|
          "+#{key}:#{value}"
        }
        default_uri + filters.join
      end

      def paginated?
        @params[:page].present?
      end

      def query_present?
        @params[:q].present?
      end

  end

end
