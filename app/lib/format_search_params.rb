class FormatSearchParams
  attr_reader :params

  def initialize(params = {})
    @params = params
  end

  def to_query
    supported_params.map do |param, value|
      "#{param}:#{value}"
    end.compact.join(' ') << " #{params['fullname']}"
  end

  def to_cache_key
    to_query.gsub(/\s+/, '') << "&page=#{params['page'] || 1}"
  end

  def supported_params
    params.select do |param, value|
      supported?(param, value)
    end
  end

  def valid?
    supported_params.any?
  end

  private

  def supported?(key, value)
    supported.include?(key.to_s) && value.present?
  end

  def supported
    %w(language location followers repos)
  end
end
