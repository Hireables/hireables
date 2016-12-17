ComposerType = GraphQL::ObjectType.define do
  name 'Composer'
  description 'Root queries that fetches object or collections.'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  connection :recipients, DeveloperType.connection_type do
    argument :query, types.String, default_value: nil
    description 'Developer connection to fetch paginated developers collection.'
    resolve(AutocompleteResolver)
  end
end
