class DeveloperResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(developer, args, ctx)
    @params = args.instance_variable_get(:@argument_values).to_h
  end

  def call
    api = Github::Api.new
    api.fetch_developer(params['id'])
  end
end
