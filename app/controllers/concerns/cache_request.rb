module CacheRequest

  extend ActiveSupport::Concern

  included do
    after_action :cache_request_key, unless: :key_cached?
  end

  private

    def cache_request_key
      # Store the request cache key in a SET
      REDIS.sadd("githubhire:cache_keys", cache_key)
      # Expire the keys in 2 days
      REDIS.expire("githubhire:cache_keys", 2.days)
    end

    def key_cached?
      # Check if key_cached in redis set?
      REDIS.sismember("githubhire:cache_keys", cache_key)
    end

    # Generate a cache key based on request params
    def cache_key
      keys = request_params.map{
        |key, value| "#{key}:#{value}" unless value.nil?
      }
      # Join keys
      keys.join
    end

end