class ApplicationController < ActionController::Base
  respond_to :json, :html
  include Tokenizeable
  protect_from_forgery with: :exception
  devise_group :user, contains: [:developer, :recruiter]
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [:name, :company, :website, :language, :location]
    )
  end
end
