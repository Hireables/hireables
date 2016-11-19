module Employers
  FileUploadMutation = GraphQL::Relay::Mutation.define do
    name 'EmployerFileUpload'
    description 'Uploads image for the employer'

    # Define input and return field
    input_field :id, !types.ID
    return_field :employer, EmployerType

    # Resolve block to upload file
    resolve(FileUploadResolver)
  end
end
