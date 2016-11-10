module Achievements
  class CreateResolver
    attr_reader :connection, :params, :current_developer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, inputs, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_developer].present?
      @connection = Schema.object_from_id(inputs['id'], ctx)
      @current_developer = ctx[:current_developer]
      safe_params = inputs.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
    end

    def call
      raise StandardError, 'Unauthorised' unless connection.owner?(current_developer)
      data = connection.data_for(params[:selection])
      achievement = current_developer.achievements.create!(data)
      achievements_connection = GraphQL::Relay::RelationConnection.new(
        current_developer.achievements,
        {}
      )

      edge = GraphQL::Relay::Edge.new(achievement, achievements_connection)

      {
        achievementEdge: edge
      }
    end
  end
end
