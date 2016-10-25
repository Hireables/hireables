web: ./passenger-status-service-agent & bundle exec passenger start -p $PORT --max-pool-size 5 --min-instances 2
redis: redis-server
worker: bundle exec sidekiq -C config/sidekiq.yml
