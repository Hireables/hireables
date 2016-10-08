QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root of this schema for reading data.'
  field :node, GraphQL::Relay::Node.field

  field :root, ViewerType do
    description 'Root field to query related collections/objects'
    resolve -> (_obj, _args, _ctx) { Viewer::STATIC }
  end

  field :developer do
    argument :id, !types.String
    type DeveloperType
    description 'Returns a developer profile by id'
    resolve(DeveloperResolver)
  end
end
