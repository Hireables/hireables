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
    developer =  Developer.find_by(login: params["id"])
    if developer.nil?
      Rails.cache.fetch(params["id"], expires_in: 2.days) do
        request = Github::Api.new("/users/#{params["id"]}").fetch
        JSON.parse(request.body, object_class: OpenStruct)
      end
    else
      Rails.cache.fetch([params["id"], developer], expires_in: 2.days) do
        developer
      end
    end
  end
end
