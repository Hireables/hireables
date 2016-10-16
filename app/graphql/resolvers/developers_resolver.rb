class DevelopersResolver
  attr_reader :params, :current_developer

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values).to_h
    @current_developer = ctx[:current_developer]
  end

  def call
    if params['hireable'].present?
      api.fetch_hireable_developers(search_query_hash)
    else
      api.fetch_developers(search_query_hash)
    end
  end

  private

  def search_query_hash
    {
      query: format_search_params.to_query,
      cache_key: format_search_params.to_cache_key,
      page: params['page'] || 1
    }
  end

  def format_search_params
    FormatSearchParams.new(params)
  end

  def api
    Github::Api.new(current_developer.try(:access_token))
  end
end
