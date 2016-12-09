MailboxType = GraphQL::ObjectType.define do
  name 'Mailbox'
  model_names ['Mailboxer::Mailbox']
  description 'Fetch mailbox conversations'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :type, types.String, 'The type of the mailbox' do
    resolve ->(obj, _args, _ctx) do
      obj.type.capitalize
    end
  end

  field :conversations_count, types.Int, 'Total number of conversations' do
    resolve ->(obj, _args, _ctx) do
      obj.send(obj.type).count
    end
  end

  connection :conversations, ConversationType.connection_type do
    description 'Conversation connection to fetch paginated conversations.'
    resolve ->(obj, _args, ctx) do
      inbox = obj.send(obj.type)
      Rails.cache.fetch([
        obj.type,
        ctx[:current_user],
        inbox.maximum(:updated_at).to_i
      ]) do
        inbox
      end
    end
  end
end
