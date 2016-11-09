PositionType = GraphQL::ObjectType.define do
  name 'Repo'
  description 'Fetch position associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  # Basic info
  field :title, types.String, 'Title of this position'
  field :summary, types.String, 'Summary of this position'
  field :start_date, types.String, 'Position start date'
  field :end_date, types.String, 'Position end date'
  field :is_current, types.Boolean, 'Is this current position?'
  field :company, types.Int, 'Company of this position'
  field :pinned, types.Boolean, 'Is position pinned?' do
    resolve -> (obj, _args, ctx) {
      ctx[:current_developer].pinned_positions.member?(obj.name)
    }
  end
end
