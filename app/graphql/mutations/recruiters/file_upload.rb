module Recruiters
  FileUpload = GraphQL::Relay::Mutation.define do
    name 'RecruiterFileUpload'
    description 'Uploads image for the recruiter'

    # Define input and return field
    input_field :id, !types.ID
    return_field :recruiter, RecruiterType

    # Resolve block to upload file
    resolve(FileUploadResolver)
  end
end
