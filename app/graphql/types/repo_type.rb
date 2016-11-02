RepoType = GraphQL::ObjectType.define do
  name 'Repo'
  description 'Fetch repo associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  # Basic info
  field :name, types.String, 'Name of this repo'
  field :description, types.String, 'Description of this repo'
  field :html_url, types.String, 'Github url of this repo'
  field :stargazers_count, types.Int, 'Stars count for this repo'
  field :watchers_count, types.Int, 'Watchers count for this repo'
  field :forks_count, types.Int, 'Forks count for this repo'
end
