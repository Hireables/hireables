web: bundle exec rails s -p $PORT
redis: redis-server
worker: bundle exec que ./config/environment.rb --worker-count $RAILS_MAX_THREADS
