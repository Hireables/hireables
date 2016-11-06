class Connection < ApplicationRecord
  belongs_to :developer, touch: true
  validates_presence_of :uid, :provider, :access_token
  validates_uniqueness_of :uid, scope: :provider

  def self.find_or_create_for_oauth(auth)
    @connection ||= find_for_oauth(auth)
    @connection.nil? ? create_from_oauth(auth) : @connection
  end

  def self.find_for_oauth(auth)
    where(uid: auth.uid, provider: auth.provider).first
  end

  def self.create_from_oauth(auth)
   create!(
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token,
    )
  end
end
