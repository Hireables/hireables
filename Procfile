web: bundle exec rails s Puma -p $PORT
cable: bundle exec passenger start -p $PORT -R cable/config.ru --force-max-concurrent-requests-per-process 0
redis: redis-server
worker: bundle exec sidekiq -C config/sidekiq.yml
