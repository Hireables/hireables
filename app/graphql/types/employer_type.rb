EmployerType = GraphQL::ObjectType.define do
  name 'Employer'
  description 'Fetch employer associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :login, types.String, 'The slug of this employer'
  field :name, types.String, 'The name of this employer'
  field :email, types.String, 'The email of this employer'
  field :bio, types.String, 'The bio of this employer'
  field :website, types.String, 'The bio of this employer'

  field :company, types.String, 'The company of this employer'
  field :location, types.String, 'The location of this employer'
  field :avatar_url, types.String, 'The avatar of this employer' do
    resolve -> (obj, _args, _ctx) { obj.avatar_url(:thumb) }
  end
end
