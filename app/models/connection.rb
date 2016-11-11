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
  after_commit :create_import, if: :active?

  def self.find_or_create_for_oauth(auth)
    @connection ||= find_for_oauth(auth)
    @connection.nil? ? create_from_oauth(auth) : @connection
  end

  def self.find_for_oauth(auth)
    where(uid: auth.uid, provider: auth.provider).first
  end

  def self.create_from_oauth(auth)
    create!(
      uid: auth.uid,
      provider: auth.provider,
      access_token: auth.credentials.token
    )
  end

  def active?
    !expired? && access_token.present? && developer_id.present?
  end

  def owner?(user)
    user == developer
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def create_import
    send(provider_import_methods.fetch(provider)).map do |item|
      imports.first_or_create(
        developer: connection.developer,
        source_id: item.id,
        source_name: provider,
      ).update(data: item.to_attrs)
    end
  rescue KeyError
    'Unknown connection'
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
