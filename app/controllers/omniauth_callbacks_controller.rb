class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :failure, if: :malformed_auth?

  def linkedin
    if developer_signed_in?
      @connection = current_developer.connection_by_provider(auth_hash.provider)
      @connection.update_from_oauth(auth_hash)
      redirect_to developer_path(current_developer.login)
    else
      redirect_to root_path, status: :unauthorised
    end
  end

  def github
    @developer = Authenticator.call(auth_hash)
    if @developer.persisted?
      sign_in @developer, event: :authentication
      redirect_to root_path
    else
      failure
    end
  end

  def failure
    flash[:alert] = 'Please try again'
    redirect_to new_developer_session_path
  end

  def after_sign_up_path_for(resource)
    if resource.email_verified?
      super resource
    else
      finish_signup_path(resource)
    end
  end

  def after_sign_in_path_for(resource)
    if resource.email_verified?
      super resource
    else
      edit_developer_path(resource)
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def malformed_auth?
    auth_hash.nil? || auth_hash[:info].nil?
  end
end
