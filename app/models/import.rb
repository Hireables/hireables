class Import < ApplicationRecord
  belongs_to :connection
  belongs_to :developer, touch: true

  validates_presence_of :source_id, :data
  validates_uniqueness_of :source_id, scope: [:connection_id, :category]

  store_accessor :data, :location, :company, :thumbnails, :html_url,
                 :up_vote_count, :stargazers_count, :likeCount, :link,
                 :isCurrent, :homepage, :forks_count, :is_accepted,
                 :viewCount, :comment_count, :score, :body, :summary,
                 :description, :title, :name, :full_name, :language,
                 :yes_rsvp_count, :votes_count, :comments_count, :tagline,
                 :discussion_url, :redirect_url, :featured, :thumbnail,
                 :comments

  def self.by_source(source)
    where(source_name: source)
  end
end
