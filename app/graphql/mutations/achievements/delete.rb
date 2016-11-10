module Achievements
  Delete = GraphQL::Relay::Mutation.define do
    name 'AchievementDelete'
    description 'Delete an achievement based on data source id'

    # Define input and return field
    input_field :id, !types.ID

    # Return field
    return_field :deletedId, !types.ID
    return_field :developer, DeveloperType

    # Resolve block to update a model
    resolve(Achievements::CreateResolver)
  end
end
