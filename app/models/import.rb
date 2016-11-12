class Import < ApplicationRecord
  belongs_to :connection
  belongs_to :developer, touch: true

  validates_presence_of :source_id, :data
  validates_uniqueness_of :source_id, scope: :connection_id
  store_accessor :data, :html_url, :up_vote_count, :stargazers_count,
                 :likeCount, :body, :summary, :description,
                 :title, :name, :full_name, :link, :creation_date,
                 :startDate, :publishedAt, :pushed_at

  def self.by_source(source)
    where(source_name: source)
  end
end
