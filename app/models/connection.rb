class Connection < ApplicationRecord
  belongs_to :developer, touch: true
  validates_presence_of :uid, :provider, :access_token
  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
    where(uid: auth.uid, provider: auth.provider).first
  end

  def self.create_from_oauth(auth)
   create!(
      uid: auth.uid,
      provider: auth.provider,
      token: auth.credentials.token,
      secret: auth.credentials.secret
    )
  end
end
