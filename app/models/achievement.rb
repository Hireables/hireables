class Achievement < ApplicationRecord
  belongs_to :developer
  validates_presence_of :source_id, :data
  validates_uniqueness_of :source_id, scope: :developer_id
  store_accessor :data, :html_url, :company, :blog, :followers,
                 :up_vote_count, :stargazers_count, :likeCount, :body,
                 :summary, :description, :title, :name, :full_name,
                 :link, :creation_date, :answer_id, :startDate, :publishedAt

  after_create :cache_pinned_achievement
  before_destroy :delete_cached_pinned_achievement

  private

  def cache_pinned_achievement
    developer.pinned_achievements << source_id
  end

  def delete_cached_pinned_achievement
    developer.pinned_achievements.delete(source_id)
    true
  end
end
