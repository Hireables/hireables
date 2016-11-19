module Developers
  ToggleAchievementMutation = GraphQL::Relay::Mutation.define do
    name 'ToggleAchievement'
    description 'Add or remove an achievement from profile based on selection'

    # Define input and return field
    input_field :id, !types.ID

    # Return field
    return_field :developer, DeveloperType
    return_field :connection, ConnectionType

    # Resolve block to update a model
    resolve(Developers::ToggleAchievementResolver)
  end
end
