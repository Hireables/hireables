module Developers
  UnpinAchievementMutation = GraphQL::Relay::Mutation.define do
    name 'UnpinAchievement'
    description 'Remove an achievement from profile'

    # Define input and return field
    input_field :id, !types.ID

    # Return field
    return_field :deletedId, !types.ID
    return_field :developer, DeveloperType
    return_field :import, ImportType

    # Resolve block to update a model
    resolve(Developers::RemoveAchievementResolver)
  end
end
