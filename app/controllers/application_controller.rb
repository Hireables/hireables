class ApplicationController < ActionController::Base
  include Tokenizeable
  protect_from_forgery with: :exception
  before_action :ensure_signup_complete

  def ensure_signup_complete
    return if devise_controller?
    redirect_to(
      edit_developer_path(current_developer.login),
      notice: 'Please complete your profile.'
    ) if current_developer && !current_developer.joined?
  end
end
