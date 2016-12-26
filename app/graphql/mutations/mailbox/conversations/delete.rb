module Mailbox
  module Conversations
    Delete = GraphQL::Relay::Mutation.define do
      name 'DeleteConversation'
      description 'Deletes a conversation by ID'

      # Define input and return field
      input_field :id, !types.ID
      input_field :mailbox_id, !types.ID

      # Define return parameters
      return_field :mailbox, MailboxType
      return_field :deletedId, !types.ID

      # Resolve block to mark a conversation as read
      resolve ->(_obj, inputs, ctx) do
        raise StandardError 'Unauthorised' unless ctx[:current_user].present?
        mailbox = Schema.object_from_id(inputs[:mailbox_id], ctx)
        conversation = Schema.object_from_id(inputs[:id], ctx)

        conversation.mark_as_deleted(ctx[:current_user])
        { mailbox: mailbox, deletedId: inputs[:id] }
      end
    end
  end
end
