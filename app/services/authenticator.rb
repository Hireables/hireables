class Authenticator
  attr_reader :auth, :developer

  def self.call(*args)
    new(*args).find_or_create_from_omniauth
  end

  def initialize(auth)
    @auth = auth
    @developer = Developer.where(
      uid: auth.info.uid,
      provider: auth.info.provider
    ).first
  end

  def find_or_create_from_omniauth
    if developer.nil?
      create_from_omniauth
    else
      developer
    end
  end

  private

  def create_from_omniauth
    Developer.create!(
      email: auth.info.email,
      password: Devise.friendly_token[0, 20],
      first_name: auth.info.first_name,
      last_name: auth.info.last_name,
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token,
    )
  end
end
