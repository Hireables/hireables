ViewerType = GraphQL::ObjectType.define do
  name 'Viewer'
  description 'Root queries that fetches object or collections.'
  interfaces [GraphQL::Relay::Node.interface]

  # `id` exposes the UUID
  global_id_field :id

  field :total_count, types.Int do
    description 'Total number of results'
    resolve -> (obj, args, ctx) { DevelopersResolver.new(obj, args, ctx).results }
  end

  field :pages, types.Int do
    description 'Total number of pages'
    resolve -> (obj, args, ctx) { DevelopersResolver.new(obj, args, ctx).pages }
  end

  connection :developers, DeveloperType.connection_type do
    argument :fullname, types.String, default_value: nil
    argument :location, types.String, default_value: nil
    argument :language, types.String, default_value: nil
    argument :followers, types.String, default_value: nil
    argument :repos, types.String, default_value: nil
    argument :page, types.String, default_value: "1"
    # argument :hireable, types.Boolean, default_value: nil
    # argument :remote, types.Boolean, default_value: nil
    # argument :relocate, types.Boolean, default_value: nil
    # argument :fulltime, types.Boolean, default_value: nil
    # argument :parttime, types.Boolean, default_value: nil
    argument :order, types.String, default_value: nil
    description 'Developer connection to fetch paginated developers collection.'
    resolve -> (obj, args, ctx) { DevelopersResolver.new(obj, args, ctx).collection }
  end
end
