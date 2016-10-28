DeveloperConnectionWithPagination = DeveloperType.define_connection do
  name "DeveloperConnectionWithPagination"
  field :totalCount do
    type types.Int
    resolve ->(obj, args, ctx) { obj.nodes.count }
  end
end

ViewerType = GraphQL::ObjectType.define do
  name 'Viewer'
  description 'Root queries that fetches object or collections.'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  connection :developers, DeveloperConnectionWithPagination do
    argument :location, types.String, default_value: nil
    argument :language, types.String, default_value: nil
    argument :repos, types.String, default_value: nil
    argument :hireable, types.String, default_value: nil
    argument :page, types.String, default_value: '1'
    argument :order, types.String, default_value: nil
    description 'Developer connection to fetch paginated developers collection.'
    resolve(DevelopersResolver)
  end
end
