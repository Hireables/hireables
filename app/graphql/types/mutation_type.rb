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
  field :RemoveAchievement, field: Developers::RemoveAchievementMutation.field
  field :MarkAsReadMutation, field: Mailbox::MarkAsReadMutation.field
  field :ConversationReply, field: Mailbox::ConversationReplyMutation.field
  field :CreateConversation, field: Mailbox::CreateConversation.field
end
