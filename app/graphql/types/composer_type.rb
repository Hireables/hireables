ComposerType = GraphQL::ObjectType.define do
  name 'Composer'
  description 'Root queries that fetches object or collections.'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :recipient, ParticipantType, 'Return a single recipient based on id' do
    argument :login, types.String, default_value: nil
    resolve ->(_obj, args, _ctx) do
      Developer.find_by(login: args['login'])
    end
  end

  field :mailbox, MailboxType, 'Returns sentbox' do
    resolve ->(_obj, _args, ctx) do
      Mailboxer::Mailbox.new(ctx[:current_employer], 'sentbox')
    end
  end

  connection :recipients, DeveloperType.connection_type do
    argument :query, types.String, default_value: nil
    description 'Developer connection to fetch paginated developers collection.'
    resolve(AutocompleteResolver)
  end
end
