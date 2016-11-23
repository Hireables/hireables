MessageType = GraphQL::ObjectType.define do
  name 'Message'
  description 'Fetch message associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id
end
