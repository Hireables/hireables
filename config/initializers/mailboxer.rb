Mailboxer.setup do |config|
  config.uses_emails = false
  config.search_enabled = false
  config.search_engine = :solr
  config.subject_max_length = 255
  config.body_max_length = 3200000
end

Rails.application.config.to_prepare do
  Mailboxer::Mailbox.class_eval do
    attr_accessor :type, :id
    def initialize(messageable, type='inbox')
      @messageable = messageable
      @type = type
      @id = "#{messageable.class.name}-#{messageable.id}-#{type}"
    end

    def self.find(id)
      id_parts = id.split('-')
      messageable = Object.const_get(id_parts[0]).find(id_parts[1])
      Mailboxer::Mailbox.new(messageable, id_parts[2])
    end

    def drafts
      Mailboxer::Conversation.draft(messageable)
    end
  end

  Mailboxer::Receipt.class_eval do
    scope :draft, lambda { where(is_draft: true) }
  end

  Mailboxer::Conversation.class_eval do
    scope :draft, lambda { |participant|
      participant(participant).merge(Mailboxer::Receipt.draft)
    }
  end
end
