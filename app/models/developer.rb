class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :html_url, :avatar_url, :company, :blog,
                 :followers, :public_gists, :public_repos
  after_commit :cache_login!, :delete_cache!, :delete_languages_cache!
  after_commit :set_premium!, on: :update, unless: :joined?

  def joined?
    premium_fields.all? do |field|
      public_send(field).present?
    end && premium?
  end

  private

  def cache_login!
    REDIS.sadd('hireables:developers_logins', login)
  end

  def set_premium!
    update!(premium: true)
  end

  def delete_cache!
    Rails.cache.delete(login)
  end

  def delete_languages_cache!
    Rails.cache.delete([login, 'languages'])
  end

  def premium_fields
    %w(bio email platforms location)
  end
end
