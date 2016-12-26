module Mailbox
  module Conversations
    Create = GraphQL::Relay::Mutation.define do
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
        employer = ctx[:current_employer]
        raise StandardError 'Unauthorised' unless employer.present?
        mailbox = Schema.object_from_id(inputs[:id], ctx)
        recipients = Developer.where(id: inputs[:recipients])
        employer.send_message(
          recipients,
          inputs[:body],
          inputs[:subject]
        )
        { mailbox: mailbox }
      end
    end
  end
end
