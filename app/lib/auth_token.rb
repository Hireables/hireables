module AuthToken
  def auth_token
    JsonWebToken.encode(set_token_payload)
  end

  private

  def set_token_payload
    return {} if permission.nil?
    { permission: permission, user_id: current_developer.try(:id) }
  end

  def request_token
    return nil unless request.headers['Authorization'].present?
    @request_token ||= request.headers['Authorization'].split(' ').last
  end

  def decoded_token
    @auth_token ||= JsonWebToken.decode(request_token)
  end

  def token?
    request_token.present? && decoded_token
  end

  def permission
    'developer' if current_developer.present?
  end
end
