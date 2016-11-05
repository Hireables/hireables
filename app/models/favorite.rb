class Favorite < ApplicationRecord
  after_commit :cache_favorited_login, on: :create
  before_destroy :delete_cached_favorited_login
  belongs_to :employer

  private

  def cache_favorited_login
    employer.favorited_developers << login
  end

  def delete_cached_favorited_login
    employer.favorited_developers.delete(login)
    true
  end
end
