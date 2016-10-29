RecruiterType = GraphQL::ObjectType.define do
  name 'Recruiter'
  description 'Fetch recruiter associated fields'
  interfaces [GraphQL::Relay::Node.interface]
  global_id_field :id

  field :login, types.String, 'The slug of this recruiter'
  field :name, types.String, 'The name of this recruiter'
  field :email, types.String, 'The email of this recruiter'
  field :bio, types.String, 'The bio of this recruiter'
  field :website, types.String, 'The bio of this recruiter'

  field :company, types.String, 'The company of this recruiter'
  field :location, types.String, 'The location of this recruiter'
  field :avatar_url, types.String, 'The avatar of this recruiter' do
    resolve -> (obj, _args, _ctx) { obj.avatar_url(:thumb) }
  end
end
