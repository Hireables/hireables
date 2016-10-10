class CacheKey
  attr_accessor :params

  def initialize(params)
    @params = params
  end

  def key
    params.map do |key, value|
      "#{key}:#{value}" if value.present?
    end.reject{ |param| param.nil? }.join('+').gsub(/\s+/, '')
  end
end
