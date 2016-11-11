class Authenticator
  attr_reader :auth

  def self.call(*args)
    new(*args).find_or_create_from_omniauth
  end

  def initialize(auth)
    @auth = auth
  end

  def find_or_create_from_omniauth
    ActiveRecord::Base.transaction do
      @connection = Connection.find_or_create_for_oauth(auth)
      @developer = @connection.developer

      if @developer.nil?
        new_developer = create_from_omniauth
        @connection.update!(developer: new_developer)
      else
        @connection.update!(access_token: auth.credentials.token)
      end

      @connection.developer
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
      login: auth.info.nickname,
      remote_avatar_url: auth.extra.raw_info.avatar_url,
      location: auth.extra.raw_info.location,
      hireable: (auth.extra.raw_info.hireable.nil? ? false : true),
      data: auth.extra.raw_info
    )
  end
end
