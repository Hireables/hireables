class DevelopersResolver
  attr_accessor :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values)
    @current_user = ctx[:current_user]
  end

  def call
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(github_api_uri).fetch
      response = Github::Response.new(request)
      response.developers_collection
    end
  end

  private

  def query_params
    Github::Params.new(params).set
  end

  def github_api_uri
    Github::Uri.new(query_params, params["first"]).get
  end

  def cache_key
    CacheKey.new(params).get
  end
end
