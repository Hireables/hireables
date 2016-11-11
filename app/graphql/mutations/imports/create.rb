module Imports
  Create = GraphQL::Relay::Mutation.define do
    name 'ImportCreate'
    description 'Create an achievement based on connection id'

    # Define input and return field
    input_field :id, !types.ID
    input_field :selection, !types.String

    # Return field
    return_field :importEdge, ImportType.edge_type
    return_field :developer, DeveloperType

    # Resolve block to update a model
    resolve(Imports::CreateResolver)
  end
end
