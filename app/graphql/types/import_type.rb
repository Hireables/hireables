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
  field :comment_count, types.Int, 'Total comments (so)'
  field :viewCount, types.Int, 'Total views (youtube)'
  field :html_url, types.String, 'Url of this source(github)'
  field :isCurrent, types.Boolean, 'Current job (linkedin)'
  field :is_accepted, types.Boolean, 'Is answer accepted?(stackoverflow)'
  field :language, types.String, 'Language of this repo'
  field :link, types.String, 'Link of this source(so)'
  field :created_at, types.String, 'When this item was created'
  field :pinned, types.Boolean, 'Is answer pinned?'

  # Nested fields
  field :company, types.String, 'Return linkedin company object' do
    resolve ->(obj, _args, _ctx) { obj.company.nil? ? nil : obj.company['name'] }
  end
end
