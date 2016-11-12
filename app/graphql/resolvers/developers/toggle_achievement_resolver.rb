module Developers
  class ToggleAchievementResolver
    attr_reader :current_developer, :achievement

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      @current_developer = ctx[:current_developer]
      raise StandardError, 'Unauthorised' unless @current_developer.present?
      @achievement = Schema.object_from_id(inputs['id'], ctx)
      raise StandardError, 'Unauthorised' unless owner?
    end

    def call
      achievement.update!(pinned: !@achievement.pinned?)
      {
        developer: current_developer.reload,
        connection: achievement.connection
      }
    end

    def owner?
      achievement.developer == current_developer
    end
  end
end
