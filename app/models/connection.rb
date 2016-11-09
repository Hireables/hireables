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
      access_token: auth.credentials.token,
    )
  end
end
