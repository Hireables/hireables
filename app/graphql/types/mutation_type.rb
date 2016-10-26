# Root Query type for changing model state
MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  description 'The mutation root of this schema for creating or changing data.'
  field :UpdateDeveloper, field: UpdateDeveloper.field
  field :RecruiterFileUpload, field: Recruiters::FileUpload.field
end
