module Developers
  class ShowResolver
    attr_reader :params, :current_user

    def self.call(*args)
      new(*args).call
    end

    def initialize(_developer, args, ctx)
      @current_user = ctx[:current_user]
      safe_params = args.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
    end

    def call
      developer = Developer.find_by_login(params[:id])
      return developer unless developer.nil?
      api = Github::Api.new(current_user.try(:access_token))
      api.fetch_developer(params[:id])
    end
  end
end
