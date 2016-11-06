class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable

  store_accessor :data, :html_url, :company, :blog, :followers,
                 :public_gists, :public_repos

  validates_presence_of :name, :login, :provider, :uid
  validates_uniqueness_of :login

  has_many :connections, dependent: :destroy
  has_many :achievements, dependent: :destroy

  before_save :format_platforms, unless: :empty_platforms?
  after_commit :set_premium!, on: :update, if: :profile_completed?
  after_commit :fetch_languages!, on: :create
  after_commit :cache_orgs!, on: :create
  after_commit :notify_admin!, on: :create

  mount_uploader :avatar, ImageUploader

  def profile_completed?
    required_fields.all? do |field|
      field = public_send(field)
      field.present? && !field.empty?
    end && !premium?
  end

  private

  def notify_admin!
    AdminMailerWorker.perform_async(
      self.class.name, id
    ) if Rails.env.production?
  end

  def empty_platforms?
    platforms.nil? || platforms.empty?
  end

  def format_platforms
    self.platforms = platforms.join(',').split(',')
  end

  def required_fields
    %w(bio email platforms location)
  end

  def fetch_languages!
    FetchDeveloperLanguagesWorker.perform_async(login, access_token)
  end

  def cache_orgs!
    FetchDeveloperOrgsWorker.perform_async(login, access_token)
  end

  def set_premium!
    update!(premium: profile_completed?)
  end
end
