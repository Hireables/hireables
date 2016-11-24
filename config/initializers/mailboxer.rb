Mailboxer.setup do |config|
  config.uses_emails = false
  config.search_enabled = false
  config.search_engine = :solr
  config.subject_max_length = 255
  config.body_max_length = 32000
end

Rails.application.config.to_prepare do
  Mailboxer::Mailbox.class_eval do
    attr_accessor :type, :id
    def initialize(messageable, type='inbox')
      @messageable = messageable
      @type = type
      @id = "#{messageable.class.name}-#{messageable.id}-#{type}"
    end
  end
end
