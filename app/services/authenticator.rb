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
      developer.update!(access_token: auth.credentials.token)
      developer
    end
  end

  private

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def create_from_omniauth
    Developer.create!(
      email: auth.info.email,
      bio: auth.extra.raw_info.bio,
      password: Devise.friendly_token[0, 20],
      name: auth.info.name,
      uid: auth.uid,
      login: auth.info.nickname,
      remote_avatar_url: auth.extra.raw_info.avatar_url,
      location: auth.extra.raw_info.location,
      provider: auth.provider,
      hireable: (auth.extra.raw_info.hireable.nil? ? false : true),
      access_token: auth.credentials.token,
      data: auth.extra.raw_info
    )
  end
end
