class Recruiter < ApplicationRecord
  store :preferences, accessors: [ :language, :location ], coder: JSON
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable

  after_commit :expire_search_query, if: :preferences_previously_changed?

  private

  def expire_search_query
    Rails.cache.delete('search_query')
  end
end
