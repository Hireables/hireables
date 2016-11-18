class Connection < ApplicationRecord
  include HttpClient
  include Github
  include Meetup
  include Linkedin
  include Producthunt
  include Stackoverflow
  include Youtube

  belongs_to :developer, touch: true
  has_many :imports, dependent: :destroy

  validates_presence_of :provider
  validates_uniqueness_of :provider

  def owner?(user)
    user == developer
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def fetch_data
    send(import_methods.fetch(provider))

  rescue KeyError
    'Unknown import type'
  end

  def import_methods
    {
      'github' => 'fetch_repos',
      'stackoverflow' => 'fetch_answers',
      'linkedin' => 'fetch_positions',
      'youtube' => 'fetch_talks',
      'producthunt' => 'fetch_products',
      'meetup' => 'fetch_events'
    }.freeze
  end

  def expiring
    %w(stackoverflow producthunt meetup linkedin youtube)
  end
end
