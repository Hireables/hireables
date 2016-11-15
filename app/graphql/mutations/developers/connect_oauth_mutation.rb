module Developers
  ConnectOauthMutation = GraphQL::Relay::Mutation.define do
    name 'ConnectOauth'
    description 'Connects an oauth account to developer account'

    # Define input and return field
    input_field :id, !types.ID
    input_field :provider, !types.String
    input_field :access_token, types.String
    input_field :expires_at, types.String
    input_field :uid, types.String

    # Return field
    return_field :developer, DeveloperType

    # Resolve block to toggle a profile favourite
    resolve(Developers::ConnectOauthResolver)
  end
end
