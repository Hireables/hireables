class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :failure, if: :malformed_auth?

  def facebook
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

  private

  def auth_hash
    request.env['omniauth.auth']
  end

  def malformed_auth?
    auth_hash.nil? || auth_hash[:info].nil?
  end
end
