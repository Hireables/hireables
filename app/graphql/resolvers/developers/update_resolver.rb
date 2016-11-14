module Developers
  class UpdateResolver
    attr_reader :params, :developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' if ctx[:current_developer].nil?
      @params = inputs
      @developer = Schema.object_from_id(params['id'], ctx)
      raise StandardError, 'Unauthorised' if developer != ctx[:current_developer]
    end

    def call
      developer.update!(valid_params.to_h)
      { developer: developer.reload }
    end

    private

    def valid_params
      HashWithIndifferentAccess.new(
        params.instance_variable_get(
          :@original_values
        ).select do |k, _|
          developer.respond_to? "#{k}="
        end
      ).except(:id)
    end
  end
end
