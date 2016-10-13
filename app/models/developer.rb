class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :bio, :html_url, :avatar_url, :company,
  :blog, :location, :followers, :public_gists, :public_repos, :hireable

  after_commit :cache_login!

  private

  def cache_login!
    REDIS.sadd('hireables:developers_logins', login)
  end
end
