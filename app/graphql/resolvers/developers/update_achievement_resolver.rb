module Developers
  class UpdateAchievementResolver
    attr_reader :params, :achievement

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' if ctx[:current_developer].nil?
      @params = inputs
      @achievement = Schema.object_from_id(params['id'], ctx)
      user = ctx[:current_developer]
      raise StandardError, 'Unauthorised' unless user == @achievement.developer
    end

    def call
      achievement.update!(valid_params.to_h)
      { achievement: achievement.reload }
    end

    private

    def valid_params
      HashWithIndifferentAccess.new(
        params.instance_variable_get(
          :@original_values
        ).select do |k, _|
          achievement.respond_to? "#{k}="
        end
      ).except(:id)
    end
  end
end
