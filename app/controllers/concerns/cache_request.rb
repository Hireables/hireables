module CacheRequest
  # Cache the request cache_key in a redis SET
  extend ActiveSupport::Concern

  included do
    after_action :cache_request_key, unless: :key_cached?
  end

  def key_cached?
    # Check if key_cached in redis set?
    REDIS.sismember("githubhire:cache_keys", cache_key)
  end

  private
    def cache_request_key
      # Store the request cache key in a SET
      REDIS.sadd("githubhire:cache_keys", cache_key)
      # Expire the keys in 2 days
      REDIS.expire("githubhire:cache_keys", 2.days)
    end

end