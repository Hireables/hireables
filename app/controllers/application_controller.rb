class ApplicationController < ActionController::Base
  include Tokenizeable
  protect_from_forgery with: :exception
  respond_to :json, :html
  before_action :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_user, :user_signed_in?

  def current_user
    current_recruiter || current_developer
  end

  def user_signed_in?
    developer_signed_in? || recruiter_signed_in?
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [:name, :company, :website, :language, :location]
    )
  end
end
