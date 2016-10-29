class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :html_url, :avatar_url, :company, :blog,
                 :followers, :public_gists, :public_repos
  before_save :format_platforms, unless: :empty_platforms?
  after_commit :set_premium!, on: :update, if: :upgraded?
  after_commit :save_languages!, on: :create, if: :empty_platforms?
  after_commit :delete_cache, :delete_languages_cache, on: :update
  mount_uploader :avatar, ImageUploader

  def upgraded?
    premium_fields.all? do |field|
      field = public_send(field)
      field.present? && !field.empty?
    end && !premium?
  end

  private

  def empty_platforms?
    platforms.empty?
  end

  def save_languages!
    api = Github::Api.new
    languages = api.fetch_developer_languages(login)
    update!(platforms: languages)
  end

  def format_platforms
    self.platforms = platforms.join(',').split(',')
  end

  def set_premium!
    update!(premium: true)
  end

  def delete_cache
    Rails.cache.delete(['developer', login])
  end

  def delete_languages_cache
    Rails.cache.delete(['developer', login, 'languages'])
  end

  def premium_fields
    %w(bio email platforms location)
  end
end
