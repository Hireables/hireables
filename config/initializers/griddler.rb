Griddler.configure do |config|
  config.processor_class = MessageReplyProcessor
  config.processor_method = :process
  config.reply_delimiter = '-- REPLY ABOVE THIS LINE --'
  config.email_service = :sendgrid
end
