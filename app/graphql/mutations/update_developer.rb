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

  # Job types
  input_field :full_time, types.Boolean
  input_field :part_time, types.Boolean
  input_field :contract, types.Boolean
  input_field :freelance, types.Boolean
  input_field :internship, types.Boolean
  input_field :startup, types.Boolean

  # Levels
  input_field :cto, types.Boolean
  input_field :lead, types.Boolean
  input_field :senior, types.Boolean
  input_field :mid, types.Boolean
  input_field :junior, types.Boolean
  input_field :student, types.Boolean

  # Preferences
  input_field :remote, types.Boolean
  input_field :relocate, types.Boolean
  return_field :developer, DeveloperType

  # Resolve block to update a model
  resolve(DeveloperUpdateResolver)
end
