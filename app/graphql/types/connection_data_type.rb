ConnectionDataType = GraphQL::ObjectType.define do
  name 'ConnectionData'
  description 'Common type to fetch fields for various connections'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :database_id, types.String, 'Database id for this data' do
    resolve ->(obj, _args, _ctx) { obj.id }
  end

  field :title, types.String, 'title of this import' do
    resolve ->(obj, _args, _ctx) { pick_field(obj, title_fields) }
  end

  field :description, types.String, 'Description of this import' do
    resolve ->(obj, _args, _ctx) { pick_field(obj, description_fields) }
  end

  field :stars, types.Int, 'Total stars for this import' do
    resolve ->(obj, _args, _ctx) { pick_field(obj, star_fields) }
  end

  field :pinned, types.Boolean, 'Is answer pinned?' do
    resolve ->(obj, _args, ctx) { pinned?(obj, ctx) }
  end
end

def pinned?(obj, ctx)
  ctx[:current_developer].pinned_achievements.member?(pick_field(obj, title_fields))
end

def pick_field(obj, fields)
  obj.send(fields.detect { |field| obj.key?(field.to_sym) })
rescue TypeError
  'Field not found'
end

def star_fields
  %w(up_vote_count stargazers_count likeCount)
end

def description_fields
  %w(body summary description)
end

def title_fields
  %w(title name)
end
