ViewerType = GraphQL::ObjectType.define do
  name 'Viewer'
  description 'Root queries that fetches object or collections.'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  connection :developers, DeveloperType.connection_type do
    argument :location, types.String, default_value: nil
    argument :language, types.String, default_value: nil
    argument :repos, types.String, default_value: nil
    argument :hireable, types.String, default_value: nil
    argument :page, types.Int, default_value: 1
    argument :order, types.String, default_value: nil
    description 'Developer connection to fetch paginated developers collection.'
    resolve(DevelopersResolver)
  end
end
