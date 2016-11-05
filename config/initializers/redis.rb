Redis::Objects.redis = ConnectionPool.new(
  size: ENV.fetch('REDIS_SIZE'),
  timeout: 5
) {
  Redis.new(
    url: ENV.fetch('DATABASE_REDIS_URL'),
    namespace: "data_#{Rails.env.downcase}")
  )
}
