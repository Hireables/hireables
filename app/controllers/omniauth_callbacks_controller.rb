class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :failure, if: :malformed_auth?
  include Devise::Controllers::Rememberable

  def self.provides_callback_for(provider)
    class_eval %(
      def #{provider}
        @oauth = {
          uid: uid,
          access_token: oauth.credentials.token,
          expires_at: expires_at
        }
        render :callback, layout: false
      end
    )
  end

  [
    :producthunt,
    :meetup,
    :stackexchange,
    :linkedin,
    :google,
    :medium
  ].each do |provider|
    provides_callback_for provider
  end

  def github
    @developer = Authenticator.call(oauth)
    if @developer.persisted?
      remember_me(@developer)
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

  def uid
    oauth.provider == 'medium' ? "@#{oauth.info.username}" : oauth.uid
  end

  def expires_at
    return Time.at(oauth.credentials.expires_at).utc if expires?
    Time.now + 5.days
  end

  def expires?
    oauth.credentials.expires
  end

  def oauth
    request.env['omniauth.auth']
  end

  def malformed_auth?
    oauth.nil? || oauth.credentials.nil?
  end
end
