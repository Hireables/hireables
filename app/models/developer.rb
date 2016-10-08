class Developer < ActiveRecord::Base
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :bio, :html_url, :avatar_url, :company,
  :blog, :location, :followers, :public_gists, :public_repos, :email, :hireable

  def self.whitelisted_attributes
    all_attributes - protected_attributes
  end

  def self.default_scope
    select(whitelisted_attributes)
  end

  private

  def self.all_attributes
    self.columns.map(&:name).map(&:to_sym)
  end

  def self.protected_attributes
    [:access_token, :provider, :uid, :email]
  end
end
