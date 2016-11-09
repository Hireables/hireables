VideoType = GraphQL::ObjectType.define do
  name 'Video'
  description 'Fetch video associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  # Basic info
  field :title, types.String, 'Title of this video'
  field :description, types.String, 'Description of this video'
  field :published_at, types.String, 'Video published date'
  field :channel_id, types.String, 'Video channel id'
  field :thumbnail, types.Boolean, 'Video thumbnail'
  field :view_count, types.Int, 'View count for the video'
  field :like_count, types.Int, 'Like count for the video'
  field :pinned, types.Boolean, 'Is position pinned?' do
    resolve -> (obj, _args, ctx) {
      ctx[:current_developer].pinned_talks.member?(obj.name)
    }
  end
end
