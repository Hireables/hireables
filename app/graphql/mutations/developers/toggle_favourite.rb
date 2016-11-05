module Developers
  ToggleFavourite = GraphQL::Relay::Mutation.define do
    name 'ToggleFavourite'
    description 'Toggles a developer profile favourite'

    # Define input and return field
    input_field :id, !types.ID
    input_field :login, !types.String
    return_field :developer, DeveloperType

    # Resolve block to toggle a profile favourite
    resolve(ToggleFavouriteResolver)
  end
end
