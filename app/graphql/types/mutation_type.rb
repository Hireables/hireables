# Root Query type for changing model state
MutationType = GraphQL::ObjectType.define do
  name 'Mutation'
  description 'The mutation root of this schema for creating or changing data.'
  field :UpdateDeveloper, field: Developers::UpdateMutation.field
  field :UpdateEmployer, field: Employers::UpdateMutation.field
  field :ToggleFavourite, field: Employers::ToggleFavouriteMutation.field
  field :ConnectOauth, field: Developers::ConnectOauthMutation.field
  field :EmployerFileUpload, field: Employers::FileUploadMutation.field
  field :ToggleAchievement, field: Developers::ToggleAchievementMutation.field
end
