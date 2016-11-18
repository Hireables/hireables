module Developers
  class RemoveAchievementResolver
    attr_reader :current_developer, :achievement, :params

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      @current_developer = ctx[:current_developer]
      @params = inputs
      raise StandardError, 'Unauthorised' unless @current_developer.present?
      @achievement = Schema.object_from_id(inputs['id'], ctx)
      raise StandardError, 'Unauthorised' unless owner?
    end

    def call
      if achievement.update!(pinned: false)
        { developer: current_developer.reload, deletedId: params['id'] }
      end
    end

    def owner?
      achievement.developer == current_developer
    end
  end
end
