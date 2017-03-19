class Achievement < ApplicationRecord
  validates_presence_of :title, :date, :source_name, :source_id, :category
  validates_uniqueness_of :source_id, scope: [:source_name, :developer_id]
  belongs_to :developer, touch: true
  belongs_to :import, touch: true

  store_accessor :data, :location, :company, :thumbnails, :html_url,
                 :up_vote_count, :stargazers_count, :likeCount,
                 :isCurrent, :homepage, :forks_count, :is_accepted,
                 :viewCount, :comment_count, :score, :full_name, :language,
                 :yes_rsvp_count, :votes_count, :comments_count,
                 :discussion_url, :redirect_url, :featured, :thumbnail,
                 :comments, :recommends, :mediumUrl
end
