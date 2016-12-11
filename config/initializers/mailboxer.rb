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
  end

  Mailboxer::Receipt.class_eval do
    belongs_to :message,
                        class_name: "Mailboxer::Message",
                        foreign_key: "notification_id",
                        required: false,
                        counter_cache: true
  end

  Mailboxer::Message.class_eval do
    belongs_to :conversation,
               validate: true,
               autosave: true,
               counter_cache: true
  end
end
