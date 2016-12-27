class MailboxerMailer < ActionMailer::Base
  default from: ENV.fetch('NOTIFICATIONS_EMAIL')

  def new_message(reciept_id)
    @reciept = Mailboxer::Receipt.find(reciept_id)
    @receiver = @reciept.receiver
    @message = @reciept.message
    @sender = @message.sender
    @conversation = Mailboxer::Conversation.find(@message.conversation_id)

    headers 'X-SMTPAPI' => {
      unique_args: { conversation_id: @message.conversation_id }
    }.to_json

    info = "#{@message.conversation_id}+#{@receiver.class.name.downcase}"
    reply_to = "reply+#{info}@#{ENV.fetch('REPLY_DOMAIN')}"
    from = "#{@sender.name}<#{ENV.fetch('NOTIFICATIONS_EMAIL')}>"

    subject = if @conversation.messages.count > 1
                "Re: #{@message.subject}"
              else
                @message.subject
              end

    mail(
      from: from,
      to: @receiver.email,
      subject: subject,
      reply_to: reply_to
    )
  end
end
