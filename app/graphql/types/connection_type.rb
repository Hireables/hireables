ConnectionType = GraphQL::ObjectType.define do
  name 'Connection'
  description 'Fetch Connection associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :provider, types.String, 'title of this achievement'
  field :connected, types.Boolean, 'Is this account connected?' do
    resolve -> (obj, _args, ctx) { obj.access_token.present? }
  end
end
