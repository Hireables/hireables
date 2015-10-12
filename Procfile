web: bundle exec passenger start -p $PORT
redis: redis-server
worker: bundle exec sidekiq -C config/sidekiq.yml