module Mailbox
  module Conversations
    MarkAsRead = GraphQL::Relay::Mutation.define do
      name 'MarkAsReadConversation'
      description 'Mark a conversation to be read'

      # Define input and return field
      input_field :id, !types.ID
      return_field :conversation, ConversationType

      # Resolve block to mark a conversation as read
      resolve ->(_obj, inputs, ctx) do
        raise StandardError 'Unauthorised' unless ctx[:current_user].present?
        conversation = Schema.object_from_id(inputs['id'], ctx)
        conversation.mark_as_read(ctx[:current_user])
        conversation.touch
        { conversation: conversation.reload }
      end
    end
  end
end
