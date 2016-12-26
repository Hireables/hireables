module MessageableOverrides
  extend ActiveSupport::Concern

  def send_message(
    recipients,
    msg_body,
    subject,
    sanitize_text = true,
    attachment = nil,
    message_timestamp = Time.now,
    message_object = nil
  )
    convo = Mailboxer::ConversationBuilder.new(
      subject:    subject,
      created_at: message_timestamp,
      updated_at: message_timestamp
    ).build

    message = Mailboxer::MessageBuilder.new(
      sender:       self,
      message_object: message_object,
      conversation: convo,
      recipients:   recipients,
      body:        msg_body,
      subject:      subject,
      attachment:   attachment,
      created_at:   message_timestamp,
      updated_at:   message_timestamp
    ).build

    message.deliver false, sanitize_text
  end
end
