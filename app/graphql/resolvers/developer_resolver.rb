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
    developer = Developer.find_by_login(params[:id])
    return developer unless developer.nil?
    api = Github::Api.new
    api.fetch_developer(params[:id])
  end
end
