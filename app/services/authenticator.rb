class Authenticator
  attr_reader :auth

  def self.call(*args)
    new(*args).find_or_create_from_oauth
  end

  def initialize(auth)
    @auth = auth
  end

  def find_or_create_from_oauth
    ActiveRecord::Base.transaction do
      @connection = Connection.first_or_initialize(connection_attributes)
      return @connection.developer unless @connection.developer.nil?
      @connection.developer = create_from_oauth

      @connection.developer if @connection.save
    end
  end

  private

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def create_from_oauth
    Developer.new(
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

  def connection_attributes
    {
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token
    }
  end
end
