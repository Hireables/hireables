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

  after_commit :store_data, unless: [:inactive?, :data_exists?]

  def self.find_or_create_for_oauth(auth)
    ActiveRecord::Base.transaction do
      @connection ||= find_for_oauth(auth)
      @connection.nil? ? create_from_oauth(auth) : @connection
    end
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

  def data_exists?
    !data.nil? && !data.empty?
  end

  def inactive?
    expired? || access_token.nil? || developer_id.nil?
  end

  def owner?(user)
    user == developer
  end

  def expired?
    expiring.include?(provider) && Time.now.to_i > expires_at.to_i
  end

  def store_data
    provider_data_collection = send(provider_data_methods.fetch(provider))
    provider_data_hash = provider_data_collection.map do |item|
      imports.create(
        developer: connection.developer,
        source_id: item.id,
        source_name: provider,
        data: item.to_attrs
      )
      item.to_attrs
    end
  rescue KeyError
    'Unknown connection'
  end

  def provider_data_methods
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
