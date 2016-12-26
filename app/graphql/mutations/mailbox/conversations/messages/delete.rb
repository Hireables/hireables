module Mailbox
  module Conversations
    module Messages
      Delete = GraphQL::Relay::Mutation.define do
        name 'DeleteConversationMessage'
        description 'Deletes a conversation message by ID'

        # Define input and return field
        input_field :id, !types.ID
        input_field :conversation_id, !types.ID

        # Define return parameters
        return_field :conversation, ConversationType
        return_field :deletedId, !types.ID

        # Resolve block to mark a conversation as read
        resolve ->(_obj, inputs, ctx) do
          raise StandardError 'Unauthorised' unless ctx[:current_user].present?
          conversation = Schema.object_from_id(inputs[:conversation_id], ctx)
          message = Schema.object_from_id(inputs[:id], ctx)

          ctx[:current_user].mark_as_deleted(message)
          { conversation: conversation, deletedId: inputs[:id] }
        end
      end
    end
  end
end
