class Favorite < ApplicationRecord
  after_commit :cache_favorited_login, on: :create
  belongs_to :employer

  private

  def cache_favorited_login
    employer.favorited_logins << login
  end
end
