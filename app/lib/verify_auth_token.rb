module VerifyAuthToken
  def decoded_token
    @auth_token ||= AuthToken.decode(request_token)
  end

  def token?
    request_token.present? && decoded_token
  end
end
