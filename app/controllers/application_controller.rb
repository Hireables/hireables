class ApplicationController < ActionController::Base
  include Tokenizeable
  protect_from_forgery with: :exception
  before_action :ensure_signup_complete

  def ensure_signup_complete
    return if devise_controller?
    if current_developer && !current_developer.premium?
      redirect_to(
        edit_developer_path(current_developer),
        notice: "Please select your location to complete registeration."
      )
    end
  end
end
