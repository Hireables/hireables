class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable,
         :validatable, :omniauthable, :rememberable

  store_accessor :data, :html_url, :company, :followers,
                 :public_gists, :public_repos

  validates_presence_of :name, :login
  validates_uniqueness_of :login

  has_many :connections, dependent: :destroy
  has_many :achievements, -> { where(pinned: true) }, class_name: 'Import'

  before_save :format_languages, unless: :empty_languages?
  after_commit :seed_available_connections, on: :create
  after_commit :set_premium!, on: :update, if: :profile_completed?
  after_commit :fetch_languages!, on: :create
  after_commit :cache_orgs!, on: :create
  after_commit :notify_admin!, on: :create

  mount_uploader :avatar, ImageUploader

  acts_as_messageable

  def empty_languages?
    languages.nil? || languages.empty?
  end

  def format_languages
    self.languages = languages.join(',').split(',')
  end

  def profile_completed?
    required_fields.all? do |field|
      field = public_send(field)
      field.present? && !field.empty?
    end && !premium?
  end

  def access_token_by_provider(provider)
    connection_by_provider(provider).try(:access_token)
  end

  def connection_by_provider(provider)
    connections.where(provider: provider).first
  end

  def github_access_token
    @github_access_token ||= access_token_by_provider('github')
  end

  def set_premium!
    update!(premium: profile_completed?)
  end

  private

  def seed_available_connections
    SeedConnectionsJob.enqueue(id)
  end

  def notify_admin!
    return unless Rails.env.production?
    AdminMailerJob.enqueue(self.class.name, id)
  end

  def fetch_languages!
    FetchDeveloperLanguagesJob.enqueue(login, github_access_token)
  end

  def cache_orgs!
    FetchDeveloperOrgsJob.enqueue(login, github_access_token)
  end

  def required_fields
    %w(bio email location blog languages)
  end
end
