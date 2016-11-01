Raven.configure do |config|
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.dsn = ENV.fetch('SENTRY_DSN')
end
