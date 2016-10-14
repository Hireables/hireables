module Tokenizeable
  extend ActiveSupport::Concern

  included do
    before_action :set_token!, if: :graphql_controller?
    helper_method :auth_token
  end

  def auth_token
    JsonWebToken.encode(set_token_payload)
  end

  protected

  def set_token!
    cookies[:_graphql_token] = auth_token
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

  def graphql_controller?
    params[:controller] == 'graphql/query'
  end

  def set_token_payload
    return {} if permission.nil?
    {
      permission: permission,
      user_id: current_developer.try(:id)
    }
  end

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
                      request.headers['Authorization'].split(' ').last
                    end
  end

  def decoded_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def token?
    http_token && decoded_token
  end

  def permission
    'developer' if current_developer.present?
  end
end
