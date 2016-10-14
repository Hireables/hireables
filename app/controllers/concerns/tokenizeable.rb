module Tokenizeable
  extend ActiveSupport::Concern

  included do
    include VerifyAuthToken
    before_action :set_token!
    helper_method :auth_token
  end

  def auth_token
    AuthToken.encode(token_payload)
  end

  protected

  def set_token!
    cookies.signed[:_api_token] = auth_token
  end

  def verify_token!
    unless token?
      render json: {
        errors: ['You are not authorised']
      }, status: :unauthorized
      return
    end

  rescue JWT::VerificationError, JWT::DecodeError
    render json: {
      errors: ['You are not authorised']
    }, status: :unauthorized
  end

  private

  def request_token
    return nil unless request.headers['Authorization'].present?
    @request_token ||= request.headers['Authorization'].split(' ').last
  end

  def token_payload
    return {} if permission.nil?
    { permission: permission, user_id: current_developer.try(:id) }
  end

  def permission
    'developer' if current_developer.present?
  end

  def graphql_controller?
    params[:controller] == 'graphql/query'
  end
end
