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
      box = Rails.cache.fetch([obj.type, obj.send(obj.type).cache_key]) do
        obj.send(obj.type).to_a
      end
      box.count
    end
  end

  connection :conversations, ConversationType.connection_type do
    description 'Conversation connection to fetch paginated conversations.'
    resolve ->(obj, _args, _ctx) do
      Rails.cache.fetch([obj.type, obj.send(obj.type).cache_key]) do
        obj.send(obj.type).to_a
      end
    end
  end
end
