pooled_redis = ConnectionPool.new(
  size: ENV.fetch('REDIS_SIZE'),
  timeout: 5
) { Redis.new(url: ENV.fetch('REDIS_URL'), namespace: "sidekiq_#{Rails.env.downcase}") }


Sidekiq.configure_server do |config|
  config.redis = pooled_redis
end

Sidekiq.configure_client do |config|
  config.redis = pooled_redis
end
