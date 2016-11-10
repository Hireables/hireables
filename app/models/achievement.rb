class Achievement < ApplicationRecord
  belongs_to :developer
  validates_presence_of :title, :date, :source, :category
  validates_uniqueness_of :title, scope: [:category, :developer_id, :source]
  after_create :cache_pinned_achievement
  before_destroy :delete_cached_pinned_achievement

  private

  def cache_pinned_achievement
    developer.pinned_achievements << title
  end

  def delete_cached_pinned_achievement
    developer.pinned_achievements.delete(title)
    true
  end
end
