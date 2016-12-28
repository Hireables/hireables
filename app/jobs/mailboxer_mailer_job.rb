class MailboxerMailerJob < Que::Job
  def run(reciept_id)
    MailboxerMailer.new_message(reciept_id).deliver
  end
end
