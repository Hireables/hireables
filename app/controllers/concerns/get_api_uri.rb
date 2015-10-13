module GetApiUri

  extend ActiveSupport::Concern

  def request_uri
    # Get api request uri based on params
    # paginated? : paginated_uri : default_uri
    Github::Uri.new(request_params).get
  end

end