class FormatSearchParams
  attr_reader :params

  def initialize(params = {})
    @params = params
  end

  def to_query
    params.to_h.map do |param, value|
      "#{param}:#{value}" if supported?(param, value)
    end.compact.join(' ') << " #{params['fullname']}"
  end

  def to_cache_key
    to_query.gsub(/\s+/, '') << "&page=#{params['page'] || 1}"
  end

  def valid?
    params.to_h.map do |param, value|
      supported?(param, value)
    end.any?
  end

  private

  def supported?(key, value)
    supported.include?(key.to_s) && value.present?
  end

  def supported
    %w(language location followers repos)
  end
end
