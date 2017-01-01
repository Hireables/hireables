module Developers
  class RemoveAchievementResolver
    attr_reader :current_developer, :import, :params

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      @current_developer = ctx[:current_developer]
      @params = inputs
      raise StandardError, 'Unauthorised' unless @current_developer.present?
      @import = Schema.object_from_id(inputs[:id], ctx)
      raise StandardError, 'Unauthorised' unless owner?
    end

    def call
      import.update!(pinned: false)
      Achievement.find_by(
        source_name: import.source_name,
        source_id: import.source_id
      ).destroy!

      { developer: current_developer.reload, deletedId: params['id'] }
    end

    def owner?
      import.developer == current_developer
    end
  end
end
