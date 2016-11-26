MailboxType = GraphQL::ObjectType.define do
  name 'Mailbox'
  description 'Fetch mailbox conversations'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :type, types.String, 'The type of the mailbox'
  connection :conversations, ConversationType.connection_type do
    description 'Conversation connection to fetch paginated conversations.'
    resolve ->(obj, _args, _ctx) do
      obj.send(obj.type)
    end
  end
end
