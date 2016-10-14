module Tokenizeable
  extend ActiveSupport::Concern

  included do
    include AuthToken
    before_action :set_token!, unless: :valid_token?
  end

  protected

  def verify_token!
    render_unauthorised && return unless token?
    redirect_to root_path && return unless valid_token?

  rescue JWT::VerificationError, JWT::DecodeError
    render_unauthorised
  end

  private

  def render_unauthorised
    render json: { errors: ['You are not authorised'] }, status: :unauthorized
  end
end
