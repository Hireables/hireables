class DeveloperResolver
  attr_reader :developer, :params, :current_developer

  def self.call(*args)
    new(*args).call
  end

  def initialize(developer, args, ctx)
    @developer = developer
    @params = args.instance_variable_get(:@argument_values).to_h
    @current_developer = ctx[:current_developer]
  end

  def call
    api = Github::Api.new(current_developer.try(:access_token))
    api.fetch_developer(params['id'])
  end
end
