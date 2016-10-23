UpdateDeveloper = GraphQL::Relay::Mutation.define do
  name 'UpdateDeveloper'
  description 'Update Developer'

  # Define input and return field
  input_field :id, !types.ID
  input_field :bio, types.String
  input_field :email, types.String
  input_field :location, types.String
  input_field :platforms, types[types.String]
  input_field :linkedin, types.String
  input_field :hireable, types.Boolean
  input_field :subscriptions, types.Int
  input_field :job_types, types[types.String]
  input_field :remote, types.Boolean
  input_field :salary, types.Int
  input_field :relocate, types.Boolean
  input_field :subscribed, types.Boolean

  return_field :developer, DeveloperType

  # Resolve block to update a model
  resolve(DeveloperUpdateResolver)
end
