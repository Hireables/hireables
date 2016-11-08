ruby '2.2.5'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '>= 5.0.x'
gem 'pg'

# Web Server
gem 'passenger'

# SASS
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# HTTP requests and caching
gem 'octokit'
gem 'faraday'
gem 'sawyer'
gem 'typhoeus'

# Background workers
gem 'sidekiq'
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
gem 'linkedin'
gem 'omniauth-linkedin-oauth2', github: 'decioferreira/omniauth-linkedin-oauth2'
gem 'devise'

# CORS
gem 'rack-cors', :require => 'rack/cors'

# Client side routes
gem 'js-routes'

# Graphql
gem 'graphql', '1.0.0'

# Auth token
gem 'jwt'

# Mail delivery
gem 'mailgun_rails'

# Image processing and upload
gem 'mini_magick'

# Amazone s3
gem 'fog-aws'

# Simple and extremely flexible way to upload files
gem 'carrierwave', git: 'https://github.com/carrierwaveuploader/carrierwave.git'

group :production do
  gem 'rails_12factor'
  gem 'sentry-raven'
  gem 'heroku-deflater'
  gem 'newrelic_rpm'
end

group :development do
  gem 'graphiql-rails'
  gem 'spring'
  gem 'foreman'
  gem 'rubocop'
  gem 'figaro'
end
