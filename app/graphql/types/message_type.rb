MessageType = GraphQL::ObjectType.define do
  name 'Message'
  description 'Fetch message associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :sender, -> { ParticipantType }, 'Message sender'
  field :body, types.String, 'Message body'
  field :subject, types.String, 'Message subject'
  field :draft, types.Boolean, 'Is message draft?'
  field :conversation_id, types.String, 'Conversation id'
  field :created_at, types.String, 'Message created at'
end
