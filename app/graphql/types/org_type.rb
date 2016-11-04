OrgType = GraphQL::ObjectType.define do
  name 'Org'
  description 'Fetch org associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  # Basic info
  field :login, types.String, 'Name of this org'
  field :description, types.String, 'Description of this org'
  field :avatar_url, types.String, 'Avatar url of this org'
  field :url, types.Int, 'Github url of this org'
end
