class CacheKey
  attr_accessor :params

  def initialize(params)
    @params = params
  end

  def set
    REDIS.sadd('hireables:cache_keys', key)
    REDIS.expire('hireables:cache_keys', 2.days)
  end

  def get
    params.map do |key, value|
      "#{key}:#{value}" unless value.nil?
    end.join('+').gsub(/\s+/, '')
  end

  def cached?
    REDIS.sismember('hireables:cache_keys', key)
  end
end
