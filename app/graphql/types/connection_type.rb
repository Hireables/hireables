ConnectionType = GraphQL::ObjectType.define do
  name 'Connection'
  description 'Fetch Connection associated fields and external api data'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :provider, types.String, 'title of this achievement'
  field :connected, types.Boolean, 'Is this account connected?' do
    resolve ->(obj, _args, _ctx) { obj.access_token.present? }
  end

  connection :data, ConnectionDataType.connection_type do
    description 'Returns data for a connection based on provider.'
    resolve ->(obj, _args, _ctx) { obj.data }
  end
end
