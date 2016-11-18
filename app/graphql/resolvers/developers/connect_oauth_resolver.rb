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
      @connection = Schema.object_from_id(params[:id], ctx)
    end

    def call
      unless connection.owner?(current_developer)
        raise StandardError, 'Unauthorised'
      end
      { connection: connection.reload } if connection.update!(valid_params)
    end

    private

    def valid_params
      params.select do |k, _|
        connection.respond_to? "#{k}="
      end.except(:id, :provider)
    end
  end
end
