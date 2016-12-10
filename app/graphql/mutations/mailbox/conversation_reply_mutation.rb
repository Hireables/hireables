module Mailbox
  ConversationReplyMutation = GraphQL::Relay::Mutation.define do
    name 'ConversationReply'
    description 'Reply to an existing conversation'

    # Define input and return field
    input_field :id, !types.ID
    input_field :body, !types.String

    # Define return parameters
    return_field :receiptEdge, ReceiptType.edge_type
    return_field :conversation, ConversationType

    # Resolve block to mark a conversation as read
    resolve ->(_obj, inputs, ctx) do
      raise StandardError 'Unauthorised' unless ctx[:current_user].present?
      conversation = Schema.object_from_id(inputs[:id], ctx)
      user = ctx[:current_user]

      # Reply to conversation
      receipt = user.reply_to_conversation(conversation, inputs[:body])
      receipts_connection = GraphQL::Relay::RelationConnection.new(
        conversation.receipts_for(user),
        {}
      )

      # Send the new edge with conversation
      edge = GraphQL::Relay::Edge.new(receipt, receipts_connection)
      { conversation: conversation.reload, receiptEdge: edge }
    end
  end
end
