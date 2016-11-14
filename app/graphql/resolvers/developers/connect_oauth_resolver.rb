module Developers
  class ConnectOauthResolver
    attr_reader :provider, :params, :current_developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_developer, args, ctx)
      unless ctx[:current_developer].present?
        raise StandardError,
              'You are not logged in'
      end
      @current_developer = ctx[:current_developer]
      safe_params = args.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
      @provider = params[:provider]
    end

    def call
      @connection = current_developer.connections.where(provider: provider).first
      @connection.update!(
        uid: params[:uid],
        access_token: params[:access_token],
        expires_at: params[:expires_at]
      )
      { developer: current_developer.reload }
    end
  end
end
