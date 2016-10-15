class FormatSearchParams
  attr_reader :params

  def initialize(params = {})
    @params = params
  end

  def to_query
    request_params.map do |param, value|
      "#{param}:#{value}"
    end.compact.join(' ') << " #{params['fullname']}"
  end

  def to_cache_key
    to_query.gsub(/\s+/, '') << "&page=#{params['page'] || 1}"
  end

  def request_params
    valid_params.any? ? valid_params : default_params
  end

  def valid_params
    params.to_h.select do |param, value|
      valid?(param, value) && value.present?
    end
  end

  private

  def valid?(key, value)
    supported.include?(key.to_s) && value.present?
  end

  def supported
    %w(language location followers repos)
  end

  def default_params
    { followers: '>10', repos: '>10' }
  end
end
