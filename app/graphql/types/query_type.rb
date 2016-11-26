QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema for reading data.'
  field :node, GraphQL::Relay::Node.field

  field :root, ViewerType do
    description 'Root field to query related collections/objects'
    resolve ->(_obj, _args, _ctx) { Viewer::STATIC }
  end

  field :developer do
    argument :id, !types.String
    type DeveloperType
    description 'Returns a developer profile by id'
    resolve(Developers::ShowResolver)
  end

  field :employer do
    argument :id, !types.String
    type EmployerType
    description 'Returns a employer profile by id'
    resolve(Employers::ShowResolver)
  end

  field :mailbox do
    argument :id, types.String
    type MailboxType
    description 'Returns a mailbox by type'
    resolve(MailboxResolver)
  end

  field :conversation do
    argument :id, !types.ID
    type ConversationType
    description 'Returns a conversation by id'
    resolve ->(_obj, args, ctx) do
      raise StandardError 'Unauthorised' unless ctx[:current_user].present?
      Schema.object_from_id(args['id'], ctx)
    end
  end
end
