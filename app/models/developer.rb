class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :html_url, :avatar_url, :company, :blog,
  :followers, :public_gists, :public_repos

  after_commit :cache_login!

  private

  def cache_login!
    REDIS.sadd('hireables:developers_logins', login)
  end
end
