class Favourite < ApplicationRecord
  after_commit :cache_favorited_login, on: :create
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
