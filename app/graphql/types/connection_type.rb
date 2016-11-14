ConnectionType = GraphQL::ObjectType.define do
  name 'Connection'
  description 'Fetch Connection associated fields and external api data'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :provider, types.String, 'Connection provider name'

  field :is_owner, types.Boolean do
    description 'Is owner of this connection?'
    resolve ->(obj, _args, ctx) do
      ctx[:current_developer].present? &&
        ctx[:current_developer].id == obj.developer_id
    end
  end

  field :expired, types.Boolean, 'Is connection token expired?' do
    resolve ->(obj, _args, _ctx) { obj.expired? }
  end

  field :connected, types.Boolean, 'Is this account connected?' do
    resolve ->(obj, _args, _ctx) { obj.access_token.present? }
  end

  connection :imports, ImportType.connection_type do
    description 'Returns imports available for a connection based on provider.'
    resolve ->(obj, _args, _ctx) { obj.imports.order(id: :asc) }
  end
end
