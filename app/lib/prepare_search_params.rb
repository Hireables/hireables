class PrepareSearchParams
  attr_reader :params, :current_user

  def initialize(params, current_user)
    @params = params
    @current_user = current_user
  end

  def to_query
    request_params.map do |param, value|
      "#{param}:#{value.gsub(/\s+/, '+')}" if supported?(param, value)
    end.compact.join(' ')
  end

  def to_props
    search_props = {
      signedIn: current_user.present?,
      first: 50,
      list: true,
      page: Integer(params[:page] || 1)
    }
    supported.each do |key|
      search_props[key] = params[key.to_sym]
    end
    search_props
  end

  def valid?
    valid_params.any?
  end

  def valid_params
    params.to_h.select do |param, value|
      supported?(param, value)
    end
  end

  private

  def request_params
    valid? ? valid_params : { location: current_user.location }
  end

  def supported?(key, value)
    supported.include?(key.to_s) && value.present?
  end

  def supported
    %w(language location repos)
  end
end
