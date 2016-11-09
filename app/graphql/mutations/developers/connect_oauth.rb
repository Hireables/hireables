module Developers
  ConnectOauth = GraphQL::Relay::Mutation.define do
    name 'ConnectOauth'
    description 'Connects an oauth account to developer account'

    # Define input and return field
    input_field :id, !types.ID
    input_field :provider, !types.String
    input_field :access_token, types.String
    input_field :uid, types.String
    return_field :developer, DeveloperType

    # Resolve block to toggle a profile favourite
    resolve(ConnectOauthResolver)
  end
end
