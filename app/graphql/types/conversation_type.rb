ConversationType = GraphQL::ObjectType.define do
  name 'Conversation'
  description 'Fetch conversation associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id
end
