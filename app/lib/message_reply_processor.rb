class MessageReplyProcessor
  def initialize(email)
    @email = email
  end

  def process
    from = recipients.fetch(reply_info.last).find_by(email: @email.from[:email])
    conversation = Mailboxer::Conversation.find(reply_info.second)
    from.reply_to_conversation(conversation, @email.body)

  rescue ActiveRecord::RecordNotFound
    false

  rescue KeyError
    false
  end

  private

  def reply_info
    @email.to[0][:token].split('+')
  end

  def recipients
    {
      'employer' => Employer,
      'developer' => Developer
    }.freeze
  end
end
