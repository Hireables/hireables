module Mailbox
  module Conversations
    Trash = GraphQL::Relay::Mutation.define do
      name 'TrashConversation'
      description 'Trashes a conversation by ID'

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

        conversation.move_to_trash(ctx[:current_user])
        { mailbox: mailbox, deletedId: inputs[:id] }
      end
    end
  end
end
