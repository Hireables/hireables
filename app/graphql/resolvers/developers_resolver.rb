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
    api = Github::Api.new(current_developer.try(:access_token))
    if params['hireable'].present?
      api.fetch_hireable_developers(query)
    else
      api.fetch_developers(query)
    end
  end

  def query
    Github::Params.new(params).set
  end
end
