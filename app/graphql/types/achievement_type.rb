AchievementType = GraphQL::ObjectType.define do
  name 'Achievement'
  description 'Fetch Achievement associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :title, types.String, 'title of this achievement'
  field :description, types.String, 'Description of this achievement'
  field :source, types.String, 'Source of this achievement'
  field :category, types.String, 'Category of this achievement'
  field :date, types.String, 'Date of this achievement'
  field :link, types.String, 'Source link of this achievement'
end
