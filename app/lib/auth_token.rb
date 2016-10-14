module AuthToken
  def set_token!
    cookies.signed[:_api_token] = JWT.encode(
      payload,
      Rails.application.secrets.secret_key_base
    )
  end

  def valid_token?
    return false unless token?

    JWT.decode(
      cookies.signed[:_api_token],
      Rails.application.secrets.secret_key_base
    )
    true
  rescue JWT::ExpiredSignature
    set_token!
    false
  end

  def token?
    cookies.signed[:_api_token].present?
  end

  def payload
    {
      data: { permission: current_developer.present? ? 'developer' : 'user' },
      exp: Time.now.to_i + 1440
    }
  end
end
