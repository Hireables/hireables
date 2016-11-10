class Connection < ApplicationRecord
  include HttpClient
  include Stackoverflow
  include Linkedin
  include Github
  include Youtube

  belongs_to :developer, touch: true
  validates_presence_of :provider
  validates_uniqueness_of :provider

  def self.find_or_create_for_oauth(auth)
    ActiveRecord::Base.transaction do
      @connection ||= find_for_oauth(auth)
      @connection.nil? ? create_from_oauth(auth) : @connection
    end
  end

  def self.find_for_oauth(auth)
    where(uid: auth.uid, provider: auth.provider).first
  end

  def self.create_from_oauth(auth)
    create!(
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token
    )
  end

  def update_from_oauth(uid, token)
    update!(
      uid: uid,
      access_token: token,
      expires_at: Time.now + 30.minutes
    )
  end

  def owner?(user)
    user == developer
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def data
    send(provider_methods.fetch(provider))
  rescue KeyError
    'Unknown connection'
  end

  def provider_methods
    {
      'github' => 'fetch_repos',
      'stackoverflow' => 'fetch_answers',
      'linkedin' => 'fetch_positions',
      'youtube' => 'fetch_talks'
    }.freeze
  end

  def expiring
    %w(stackoverflow linkedin youtube)
  end
end
