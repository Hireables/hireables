module Mailbox
  CreateConversation = GraphQL::Relay::Mutation.define do
    name 'CreateConversation'
    description 'Create a new conversation'

    # Define input and return field
    input_field :id, !types.ID
    input_field :recipients, !types[types.Int]
    input_field :body, !types.String
    input_field :subject, !types.String

    # Define return parameters
    return_field :mailbox, MailboxType

    # Resolve block to mark a conversation as read
    resolve ->(_obj, inputs, ctx) do
      raise StandardError 'Unauthorised' unless ctx[:current_user].present?
      mailbox = Schema.object_from_id(inputs[:id], ctx)
      user = ctx[:current_user]
      recipients = Developer.where(id: inputs[:recipients])

      # Reply to conversation
      user.send_message(recipients, inputs[:body], inputs[:subject])
      { mailbox: mailbox }
    end
  end
end
