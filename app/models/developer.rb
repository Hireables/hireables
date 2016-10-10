class Developer < ActiveRecord::Base
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :bio, :html_url, :avatar_url, :company,
  :blog, :location, :followers, :public_gists, :public_repos, :hireable

  after_commit :cache_login!

  def self.fetch_by_login(username)
    premium = REDIS.sismember('hireables:developers_logins', username)

    if premium
      developer =  find_by(login: username)
      Rails.cache.fetch([username, developer], expires_in: 2.days) do
        developer
      end
    else
      self.fetch_from_github(username)
    end
  end

  def self.fetch_from_github(username)
    Rails.cache.fetch(username, expires_in: 2.days) do
      request = Github::Api.new("/users/#{username}").fetch
      response = Github::Response.new(request)
      if response.found?
        JSON.parse(request.body, object_class: OpenStruct)
      else
        raise ActiveRecord::RecordNotFound.new('Not Found')
      end
    end
  end

  def self.fetch_languages_from_github(username)
    Rails.cache.fetch([username, 'languages'], expires_in: 2.days) do
      request = Github::Api.new("/users/#{username}/repos").fetch
      response = Github::Response.new(request)

      if response.found?
        response.developer_languages_collection
      else
        raise ActiveRecord::RecordNotFound.new('Not Found')
      end
    end
  end

  private

  def cache_login!
    REDIS.sadd('hireables:developers_logins', login)
  end
end
