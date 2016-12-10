ConversationType = GraphQL::ObjectType.define do
  name 'Conversation'
  model_names ['Mailboxer::Conversation']
  description 'Fetch conversation associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :subject, types.String, 'Subject of this conversation'
  field :created_at, types.String, 'When this conversation was created'
  field :messages_count, types.Int, 'Total messages count'
  field :last_message, MessageType, 'Last message of this conversation' do
    resolve ->(obj, _args, _ctx) do
      obj.last_message
    end
  end

  field :database_id, types.Int, 'Is conversation trashed?' do
    resolve ->(obj, _args, _ctx) do
      obj.id
    end
  end

  field :is_trashed, types.Boolean, 'Is conversation trashed?' do
    resolve ->(obj, _args, ctx) do
      obj.is_trashed?(ctx[:current_user])
    end
  end

  field :is_unread, types.Boolean, 'Is conversation unread?' do
    resolve ->(obj, _args, ctx) do
      obj.is_unread?(ctx[:current_user])
    end
  end

  connection :receipts, ReceiptType.connection_type do
    description 'Receipt connection to fetch paginated receipts.'
    resolve ->(obj, _args, ctx) do
      obj
        .receipts_for(ctx[:current_user])
        .includes(message: :sender)
        .order(id: :desc)
    end
  end

  connection :participants, ParticipantType.connection_type do
    description 'Message connection to fetch paginated messages.'
    resolve ->(obj, _args, ctx) do
      obj.participants.select { |p| p != ctx[:current_user] }
    end
  end
end
