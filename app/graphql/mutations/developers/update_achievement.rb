module Developers
  UpdateAchievement = GraphQL::Relay::Mutation.define do
    name 'UpdateAchievement'
    description 'Update single achievement for developer'

    # Define input and return field
    input_field :id, !types.ID
    input_field :title, types.String
    input_field :description, types.String

    # Return field
    return_field :achievement, AchievementType

    # Resolve block to update a model
    resolve(Developers::UpdateAchievementResolver)
  end
end
