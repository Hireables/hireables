class DeveloperResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, _ctx)
    @params = HashWithIndifferentAccess.new(
      args.instance_variable_get(:@original_values).to_h
    )
  end

  def call
    api = Github::Api.new
    api.fetch_developer(params['id'])
  end
end
