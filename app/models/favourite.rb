class Favourite < ApplicationRecord
  validates_uniqueness_of :login, scope: :employer_id

  after_create :cache_favorited_login
  before_destroy :delete_cached_favorited_login

  belongs_to :employer
  belongs_to :developer

  private

  def cache_favorited_login
    employer.favourited_developers << login
  end

  def delete_cached_favorited_login
    employer.favourited_developers.delete(login)
    true
  end
end
