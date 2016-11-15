module Developers
  class ConnectOauthResolver
    attr_reader :params, :current_developer, :connection

    def self.call(*args)
      new(*args).call
    end

    def initialize(_developer, args, ctx)
      unless ctx[:current_developer].present?
        raise StandardError, 'Unauthorised'
      end
      @current_developer = ctx[:current_developer]
      safe_params = args.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
      @connection = current_developer.connection_by_provider(params[:provider])
    end

    def call
      unless @connection.owner?(current_developer)
        raise StandardError, 'Unauthorised'
      end
      @connection.update!(valid_params)
      { developer: current_developer.reload }
    end

    private

    def valid_params
      params.select do |k, _|
        connection.respond_to? "#{k}="
      end.except(:id, :provider)
    end
  end
end
