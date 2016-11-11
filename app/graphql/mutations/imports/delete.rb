module Imports
  Delete = GraphQL::Relay::Mutation.define do
    name 'ImportDelete'
    description 'Delete an achievement based on data source id'

    # Define input and return field
    input_field :id, !types.ID

    # Return field
    return_field :deletedId, !types.ID
    return_field :developer, !DeveloperType

    # Resolve block to update a model
    resolve(Imports::DeleteResolver)
  end
end
