$LOAD_PATH << File.expand_path('../lib', __dir__)
require_relative 'boot'

# Pick the frameworks you want:
# require "active_job/railtie"
# require "rails/test_unit/railtie"
# require 'action_cable/engine'
require 'active_model/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'sprockets/railtie'
require 'schema_reloader'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Hireables
  class Application < Rails::Application
    # Autloaded paths
    config.autoload_paths += Dir["#{config.root}/app/graphql/*"]
    config.autoload_paths += Dir["#{config.root}/app/lib/*"]
    config.autoload_paths += Dir["#{config.root}/app/workers/*"]
    config.autoload_paths << Rails.root.join('app/services')

    # Middlewares
    config.middleware.use SchemaReloader

    # Configure rails g to skip helper/assets files
    config.generators do |g|
      g.assets = false
      g.helper = false
      g.view_specs      false
      g.helper_specs    false
    end

    # Default mail delivery
    config.action_mailer.delivery_method = :mailgun
    config.action_mailer.mailgun_settings = {
      api_key: 'key-8d01b39b2d58bb5eb2341f434e4fa085',
      domain: 'sandboxc81979b8cdb3464584b7ce7647e3f1fe.mailgun.org'
    }

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'fonts.gstatic.com'
        resource '*', headers: :any, methods: [:get, :options]
      end
    end

    # Don't silence errors
    ActiveSupport.halt_callback_chains_on_return_false = false
  end
end
