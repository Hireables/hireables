class DevelopersResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values).to_h
  end

  def call
    return [] unless format_search_params.valid?
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
      page: params['page'] || 1
    }
  end

  def format_search_params
    FormatSearchParams.new(params)
  end

  def api
    Github::Api.new
  end
end
