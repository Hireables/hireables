# Root Query type for changing model state
MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  description 'The mutation root of this schema for creating or changing data.'
  field :UpdateDeveloper, field: UpdateDeveloper.field
  field :UpdateEmployer, field: Employers::UpdateEmployer.field
  field :ToggleFavourite, field: Developers::ToggleFavourite.field
  field :ConnectOauth, field: Developers::ConnectOauth.field
  field :EmployerFileUpload, field: Employers::FileUpload.field
  field :ImportCreate, field: Imports::Create.field
  field :ImportDelete, field: Imports::Delete.field
end
