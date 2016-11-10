module Achievements
  Create = GraphQL::Relay::Mutation.define do
    name 'AchievementCreate'
    description 'Create an achievement based on connection id'

    # Define input and return field
    input_field :id, !types.ID
    input_field :selection, !types.String

    # Return field
    return_field :achievementEdge, AchievementType.edge_type
    return_field :developer, DeveloperType

    # Resolve block to update a model
    resolve(Achievements::CreateResolver)
  end
end
