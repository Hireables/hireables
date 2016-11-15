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
      @connection = Connection.where(connection_attrs).first_or_initialize
      @connection.developer = create_from_oauth if @connection.developer_id.nil?
      @connection.access_token = auth.credentials.token
      @connection.importing = true
      ImportConnectionDataJob.enqueue(@connection.id) if @connection.save!
      @connection.developer
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
      blog: auth.extra.raw_info.blog,
      data: auth.extra.raw_info
    )
  end

  def connection_attrs
    {
      uid: auth.uid,
      provider: auth.provider
    }
  end
end
