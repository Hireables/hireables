module Tokenizeable
  extend ActiveSupport::Concern

  included do
    include AuthToken
    before_action :set_token!
    helper_method :auth_token
  end

  def set_token!
    cookies.signed[:_graphql_token] = auth_token
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
end
