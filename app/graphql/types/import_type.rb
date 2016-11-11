ImportType = GraphQL::ObjectType.define do
  name 'Import'
  description 'Fetch import associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :source_id, types.String, 'Data source id'
  field :source_name, types.String, 'Data source name'
  field :title, types.String, 'title of this data source'
  field :name, types.String, 'Name of this data source'
  field :description, types.String, 'Description of this data source'
  field :body, types.String, 'Body of this data source'
  field :summary, types.String, 'Summary of this data source'
  field :stargazers_count, types.Int, 'Total stars for this data source'
  field :likeCount, types.Int, 'Total likes for this data source'
  field :up_vote_count, types.Int, 'Total up votes for this data source'
  field :html_url, types.String, 'Url of this source(github)'
  field :link, types.String, 'Link of this source(so)'
  field :creation_date, types.String, 'Date of this source(so)'
  field :startDate, types.String, 'Date of this source(linkedin)'
  field :publishedAt, types.String, 'Date of this source(youtube)'
  field :pushed_at, types.String, 'Date of this source(github)'
  field :pinned, types.Boolean, 'Is answer pinned?'
end
