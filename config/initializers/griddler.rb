Griddler.configure do |config|
  config.processor_class = MessageReplyProcessor
  config.processor_method = :process_reply
  config.reply_delimiter = '-- REPLY ABOVE THIS LINE --'
  config.email_service = :sendgrid
end
