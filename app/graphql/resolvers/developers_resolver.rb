class DevelopersResolver
  attr_accessor :params, :current_user

  def initialize(obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values)
    @current_user = ctx[:current_user]

    FetchDevelopersJob.perform_later(
      [cache_key, 'collection']
    ) unless Rails.cache.exist?([cache_key, 'collection'])
  end

  def search
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(github_api_uri).fetch
      response = Github::Response.new(request)
      raise StandardError, '404 not found' unless response.found?

      OpenStruct.new({
        logins: response.logins,
        results: response.results
      })
    end
  end

  def collection
    Rails.cache.fetch([cache_key, 'collection'], expires_in: 2.days) do
      search.logins.map do |username|
        Developer.fetch_by_login(username)
      end
    end
  end

  def results
    search.results
  end

  def pages
    results / 20
  end

  private

  def default_params
    {
      followers: '>10',
      repos: '>10'
    }
  end

  def request_params
    params.map do |param, value|
      valid?(param) && value.present?
    end.any? ?  params : default_params
  end

  def valid?(key)
    supported.include?(key.to_s)
  end

  def supported
    %w(language fullname location followers repos)
  end

  def github_api_uri
    Github::Uri.new(github_params.set, 21, request_params["page"]).get
  end

  def cache_key
    CacheKey.new(request_params).key
  end

  def github_params
    Github::Params.new(request_params)
  end
end
