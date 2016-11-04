module Employers
  UpdateEmployer = GraphQL::Relay::Mutation.define do
    name 'UpdateEmployer'
    description 'Update Employer'

    # Define input and return field
    input_field :id, !types.ID
    input_field :name, types.String
    input_field :bio, types.String
    input_field :email, types.String
    input_field :location, types.String
    input_field :company, types.String
    input_field :website, types.String
    input_field :password, types.String
    input_field :current_password, types.String

    # Return field
    return_field :employer, EmployerType

    # Resolve block to update a model
    resolve(EmployerUpdateResolver)
  end
end
