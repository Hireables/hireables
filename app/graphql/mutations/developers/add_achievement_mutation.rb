module Developers
  AddAchievementMutation = GraphQL::Relay::Mutation.define do
    name 'AddAchievement'
    description 'Add or remove an achievement from profile based on selection'

    # Define input and return field
    input_field :id, !types.ID

    # Return field
    return_field :developer, DeveloperType
    return_field :import, ImportType
    return_field :achievementEdge, AchievementType.edge_type

    # Resolve block to update a model
    resolve(Developers::AddAchievementResolver)
  end
end
