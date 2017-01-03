ImportType = GraphQL::ObjectType.define do
  name 'Import'
  description 'Fetch import associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :source_id, types.String, 'Data source id'
  field :category, types.String, 'Data source category'
  field :developer_id, types.String, 'Data owner id'
  field :connection_id, types.String, 'Data source connection id'

  field :database_id, types.Int, 'Import database id' do
    resolve ->(obj, _args, _ctx) do
      obj.id
    end
  end

  field :source_name, types.String, 'Data source name'
  field :title, types.String, 'title of this data source'
  field :name, types.String, 'Name of this data source'
  field :description, types.String, 'Description of this data source'
  field :summary, types.String, 'Position summary(in)'
  field :tagline, types.String, 'Product tagline(ph)'
  field :featured, types.Boolean, 'Product featured(ph)'
  field :body, types.String, 'Body of this data source'
  field :stargazers_count, types.Int, 'Total stars for this data source'
  field :likeCount, types.Int, 'Total likes for this data source'
  field :up_vote_count, types.Int, 'Total up votes for this data source'
  field :comment_count, types.Int, 'Total comments (so)'
  field :comments_count, types.Int, 'Total comments (ph)'
  field :votes_count, types.Int, 'Total votes count (ph)'
  field :yes_rsvp_count, types.Int, 'Total attendess for event(meetup)'
  field :viewCount, types.Int, 'Total views (youtube)'
  field :comments, types.Int, 'Total comments (github pr)'
  field :html_url, types.String, 'Url of this source(github)'
  field :is_accepted, types.Boolean, 'Is answer accepted?(stackoverflow)'
  field :isCurrent, types.Boolean, 'Is current job? (in)'
  field :language, types.String, 'Language of this repo'
  field :link, types.String, 'Link of this source(so)'
  field :created_at, types.String, 'When this item was created'
  field :pinned, types.Boolean, 'Is answer pinned?'
  field :discussion_url, types.String, 'Discussion url (ph)'
  field :redirect_url, types.String, 'Product url (ph)'

  field :is_owner, types.Boolean do
    description 'Is owner of this import?'
    resolve ->(obj, _args, ctx) do
      ctx[:current_developer].present? &&
        ctx[:current_developer].id == obj.developer_id
    end
  end

  field :company, types.String do
    description 'Company name (in)'
    resolve ->(obj, _args, _ctx) do
      obj.company.nil? ? nil : obj.company['name']
    end
  end

  field :thumbnail, types.String do
    description 'ProductHunt thumbnail (ph)'
    resolve ->(obj, _args, _ctx) do
      obj.thumbnail.nil? ? nil : obj.thumbnail['image_url']
    end
  end
end
