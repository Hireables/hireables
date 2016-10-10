class DeveloperResolver
  attr_accessor :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(obj, args, ctx)
    @params = args.instance_variable_get(:@argument_values)
    @current_user = ctx[:current_user]
  end

  def call
    Developer.fetch_by_login(params["id"])
  end
end
