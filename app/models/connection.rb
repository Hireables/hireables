class Connection < ApplicationRecord
  include HttpClient
  include Stackoverflow
  include Linkedin
  include Github
  include Youtube

  belongs_to :developer, touch: true
  has_many :imports, dependent: :destroy
  validates_presence_of :provider
  validates_uniqueness_of :provider
  after_commit :create_import, if: [:active?, :unimported?]

  def active?
    !expired? && access_token.present?
  end

  def owner?(user)
    user == developer
  end

  def unimported?
    imports.where(source_name: provider).blank?
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def create_import
    send(provider_import_methods.fetch(provider)).each do |item|
      sawyer = Sawyer::Serializer.new('json')
      imports.create(
        developer: developer,
        source_id: item.id,
        source_name: provider,
        data: sawyer.decode_hash(item.to_attrs),
      )
    end
  rescue KeyError
    'Unknown import type'
  end

  def provider_import_methods
    {
      'github' => 'fetch_repos',
      'stackoverflow' => 'fetch_answers',
      'linkedin' => 'fetch_positions',
      'youtube' => 'fetch_talks'
    }.freeze
  end

  def expiring
    %w(stackoverflow linkedin youtube)
  end
end
