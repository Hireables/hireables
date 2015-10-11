web: bundle exec passenger start -p $PORT
redis: redis-server
worker: env RAILS_ENV=ENV["RAILS_ENV"] bundle exec sidekiq -C config/sidekiq.yml