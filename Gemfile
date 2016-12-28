ruby '2.2.5'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '>= 5.0.x'
gem 'pg'

# Web Server
gem 'puma'

# SASS
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# HTTP requests and caching
gem 'octokit'
gem 'faraday'
gem 'typhoeus'

# Background workers
gem 'que'
gem 'connection_pool'
gem 'redis-namespace'
gem 'redis-objects'

# Setup caching and Marshalling
gem 'dalli'

# Throttle Malacious requests
gem 'rack-attack'

# Speed up links
gem 'turbolinks', '~> 5.0.x'

# Omniauth login
gem 'omniauth-github'
gem 'omniauth-producthunt', git: 'https://github.com/gauravtiwari/omniauth-producthunt.git'
gem 'omniauth-meetup'
gem 'omniauth-stackexchange', git: 'https://github.com/gauravtiwari/omniauth-stackexchange.git'
gem 'omniauth-linkedin-oauth2', git: 'https://github.com/decioferreira/omniauth-linkedin-oauth2'
gem 'omniauth-google-oauth2'
gem 'devise'

# CORS
gem 'rack-cors', require: 'rack/cors'

# Client side routes
gem 'js-routes'

# Graphql
gem 'graphql'

# Auth token
gem 'jwt'

# Mail delivery
gem 'mailgun_rails'
gem 'griddler'
gem 'griddler-sendgrid'

# Image processing and upload
gem 'mini_magick'

# Amazone s3
gem 'fog-aws'

# Simple and extremely flexible way to upload files
gem 'carrierwave', git: 'https://github.com/carrierwaveuploader/carrierwave.git'

# Static pages
gem 'high_voltage', '~> 3.0.0'

# Private messaging
gem 'mailboxer'

group :production do
  gem 'rails_12factor'
  gem 'sentry-raven'
  gem 'heroku-deflater', git: 'https://github.com/romanbsd/heroku-deflater.git'
  gem 'puma_worker_killer'
  gem 'newrelic_rpm'
end

group :development do
  gem 'graphiql-rails'
  gem 'spring'
  gem 'pry-rails'
  gem 'awesome_print'
  gem 'foreman'
  gem 'rubocop'
  gem 'figaro'
end
