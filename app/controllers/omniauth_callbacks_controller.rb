class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :failure, if: :malformed_auth?
  include Devise::Controllers::Rememberable

  def self.provides_callback_for(provider)
    class_eval %(
      def #{provider}
        @auth_hash = {
          uid: auth_hash.uid,
          access_token: auth_hash.credentials.token,
          expires_at: expires_at
        }
        render :callback, layout: false
      end
    )
  end

  [
    :producthunt,
    :meetup, :stackexchange,
    :linkedin,
    :google
  ].each do |provider|
    provides_callback_for provider
  end

  def github
    @developer = Authenticator.call(auth_hash)
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

  def expires_at
    return Time.at(auth_hash.credentials.expires_at).utc if expires?
    Time.now + 5.days
  end

  def expires?
    auth_hash.credentials.expires
  end

  def auth_hash
    request.env['omniauth.auth']
  end

  def malformed_auth?
    auth_hash.nil? || auth_hash.credentials.nil?
  end
end
