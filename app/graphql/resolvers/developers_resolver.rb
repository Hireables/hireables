class DevelopersResolver
  attr_accessor :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values)
    @current_user = ctx[:current_user]

    raise StandardError.new(
      'Requires atleast one search parameter'
    ) unless search_param?

    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)
  end

  def call
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(github_api_uri).fetch
      response = Github::Response.new(request)

      if response.found?
        response.developers_collection
      else
        raise ActiveRecord::RecordNotFound.new('Not Found')
      end
    end
  end

  private

  def search_param?
    params.map do |param, value|
      github_params.valid?(param) && value.present?
    end.any?
  end

  def github_api_uri
    Github::Uri.new(github_params.set, 21, params["page"]).get
  end

  def cache_key
    CacheKey.new(params).key
  end

  def github_params
    Github::Params.new(params)
  end
end
