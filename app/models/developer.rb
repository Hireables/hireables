class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :html_url, :avatar_url, :company, :blog,
                 :followers, :public_gists, :public_repos
  after_commit :set_premium!, on: :update, if: :upgraded?
  after_commit :delete_cache!, :delete_languages_cache!, on: :update

  def upgraded?
    premium_fields.all? do |field|
      field = public_send(field)
      field.present? && !field.empty?
    end && !premium?
  end

  private

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
