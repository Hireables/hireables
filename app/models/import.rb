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

  def get_field(attr)
    available_field = mapped_fields[attr.to_sym].detect do |field|
      respond_to?(field.to_sym) && send(field).present?
    end
    return nil if available_field.nil?
    send(available_field)
  end

  def mapped_fields
    {
      title: title_fields,
      description: description_fields,
      link: link_fields
    }.freeze
  end

  def title_fields
    %w(title name)
  end

  def description_fields
    %w(description summary body tagline)
  end

  def link_fields
    %w(link html_url discussion_url)
  end
end
