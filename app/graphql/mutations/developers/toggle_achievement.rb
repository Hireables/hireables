module Developers
  ToggleAchievement = GraphQL::Relay::Mutation.define do
    name 'ToggleAchievement'
    description 'Add or remove an achievement from profile based on selection'

    # Define input and return field
    input_field :id, !types.ID
    input_field :selection, !types.String

    # Return field
    return_field :developer, DeveloperType

    # Resolve block to update a model
    resolve(Developers::ToggleAchievementResolver)
  end
end
