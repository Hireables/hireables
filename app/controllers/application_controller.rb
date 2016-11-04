class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  respond_to :json, :html

  devise_group :user, contains: [:developer, :employer]

  before_action :show_developer_edit!, if: [
    :developer_signed_in?,
    :profile_incomplete?
  ]
  skip_before_action :show_developer_edit!, if: :devise_controller?
  before_action :set_raven_context, if: :tracking?
  before_action :store_current_location, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

  include Tokenizeable

  protected

  def show_developer_edit!
    redirect_to edit_developer_path(current_developer.login)
  end

  def profile_incomplete?
    !current_developer.premium?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [:name, :company, :website, :language, :location]
    )
  end

  def render_unauthorised
    render json: { errors: [message: 'Unauthorised'] }, status: 401
  end

  private

  def tracking?
    Rails.env.production?
  end

  def set_raven_context
    current_user_context = if user_signed_in?
                             logged_in_context
                           else
                             {}
                           end

    Raven.user_context(current_user_context)
    Raven.extra_context(params: params.to_h, url: request.url)
  end

  def logged_in_context
    {
      id: current_user.id,
      email: current_user.email,
      type: current_user.class.name.downcase
    }
  end

  # after login and logout path
  def store_current_location
    store_location_for(:user, request.referrer)
  end

  def after_sign_out_path_for(_resource)
    root_path
  end

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || stored_location_for(resource) || root_path
  end
end
