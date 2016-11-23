Mailboxer.setup do |config|
  config.uses_emails = false
  config.search_enabled = false
  config.search_engine = :solr
  config.subject_max_length = 255
  config.body_max_length = 32000
end
