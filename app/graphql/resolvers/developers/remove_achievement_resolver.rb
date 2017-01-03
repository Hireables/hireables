module Developers
  class RemoveAchievementResolver
    attr_reader :current_developer, :import, :params, :ctx

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      @current_developer = ctx[:current_developer]
      @params = inputs
      @ctx = ctx
      raise StandardError, 'Unauthorised' unless @current_developer.present?
      @import = Schema.object_from_id(inputs[:id], ctx)
      raise StandardError, 'Unauthorised' unless owner?
    end

    def call
      import.update!(pinned: false)
      achievement = Achievement.find_by(import: import)
      return if achievement.nil?
      achievement.destroy!

      {
        developer: current_developer.reload,
        import: import.reload,
        deletedId: Schema.id_from_object(achievement, AchievementType, ctx)
      }
    end

    def owner?
      import.developer == current_developer
    end
  end
end
