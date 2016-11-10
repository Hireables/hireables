ConnectionDataType = GraphQL::ObjectType.define do
  name 'ConnectionData'
  description 'Common type to fetch fields for various connections'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :source_id, types.String, 'Source id for this data'
  field :title, types.String, 'title of this import'
  field :name, types.String, 'Name of this import'
  field :description, types.String, 'Description of this import'
  field :body, types.String, 'Body of this import'
  field :summary, types.String, 'Summary of this import'
  field :stargazers_count, types.Int, 'Total stars for this import'
  field :likeCount, types.Int, 'Total likes for this import'
  field :up_vote_count, types.Int, 'Total up votes for this import'
  field :pinned, types.Boolean, 'Is answer pinned?' do
    resolve ->(obj, _args, _ctx) { pinned?(obj, ctx) }
  end
end

def pinned?(obj, ctx)
  ctx[:current_developer].pinned_achievements.member?(obj.source_id)
end
