require "active_support/core_ext"
Rails.application.configure do
  # Code is not reloaded between requests.
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Setup cache store for production
  config.cache_store = :readthis_store, {
    expires_in: 2.weeks.to_i,
    namespace: 'cache',
    compress: true,
    marshal: Oj,
    pool_size: 25,
    compression_threshold: 2.kilobytes,
    redis: { url: ENV.fetch('redis_url'), driver: :hiredis }
  }

  config.serve_static_files = ENV['RAILS_SERVE_STATIC_FILES'].present?

  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  # config.assets.css_compressor = :sass
  # Do not fallback to assets pipeline if a precompiled asset is missed.
  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = true
  config.assets.compress = true

  # Generate digests for assets URLs.
  config.assets.digest = true

  config.assets.enabled = true
  config.react.variant = :production

  # SSL
  config.force_ssl = true
  config.log_level = :debug

  # Translations
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new
end
