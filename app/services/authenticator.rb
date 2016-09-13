class Authenticator
  attr_reader :auth, :developer

  def self.call(*args)
    new(*args).find_or_create_from_omniauth
  end

  def initialize(auth)
    @auth = auth
    @developer = Developer.where(
      uid: auth.uid,
      provider: auth.provider
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
    puts auth.extra.raw_info
    Developer.create!(
      email: auth.info.email,
      password: Devise.friendly_token[0, 20],
      name: auth.info.name,
      uid: auth.uid,
      login: auth.info.nickname,
      city: auth.extra.raw_info.location,
      provider: auth.provider,
      available: (auth.extra.raw_info.hireable.nil? ? false : true),
      access_token: auth.credentials.token,
      data: auth.extra.raw_info
    )
  end
end
