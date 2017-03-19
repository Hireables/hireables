module Developers
  class AddAchievementResolver
    attr_reader :current_developer, :import

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      @current_developer = ctx[:current_developer]
      raise StandardError, 'Unauthorised' unless @current_developer.present?
      @import = Schema.object_from_id(inputs[:id], ctx)
      raise StandardError, 'Unauthorised' unless owner?
    end

    def call
      import.update!(pinned: true)
      achievement = current_developer.add_achievement(import)
      achievements_connection = GraphQL::Relay::RelationConnection.new(
        current_developer.achievements, {}
      )
      edge = GraphQL::Relay::Edge.new(achievement, achievements_connection)
      {
        developer: current_developer.reload,
        import: import.reload,
        achievementEdge: edge
      }
    end

    def owner?
      import.developer == current_developer
    end
  end
end
