ruby '2.2.2'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '4.2.4'
gem 'rails-api'

# Setup server
gem 'passenger'

# Asset compilation and NPM modules
gem 'browserify-rails'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# Setup react and dependencies
gem 'therubyracer', platforms: :ruby
gem 'react-rails'

# Setup Octokit and HTTP cache
gem 'faraday-http-cache'
gem 'octokit'

# Setup caching and Marshalling
gem 'readthis'
gem 'hiredis'
gem 'oj'

# Throttle Malacious requests
gem 'rack-attack'

#Speed up links
gem 'turbolinks', github: 'rails/turbolinks'

#Secure headers HTTPS headers
gem "secure_headers", :require => 'secure_headers'

group :production do
  gem 'rails_12factor'
end

group :development do
  gem 'spring'
  gem 'foreman'
  gem 'figaro'
end
