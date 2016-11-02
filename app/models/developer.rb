class Developer < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable, :omniauthable
  store_accessor :data, :html_url, :company, :blog, :followers,
  :public_gists, :public_repos
  before_save :format_platforms, unless: :empty_platforms?
  after_commit :set_premium!, on: :update, if: :profile_completed?

  # Fetch developer data async
  after_commit :fetch_languages!, on: :create
  after_commit :fetch_repos!, on: :create
  after_commit :fetch_orgs!, on: :create

  # Mount image uploader
  mount_uploader :avatar, ImageUploader

  def profile_completed?
    required_fields.all? do |field|
      field = public_send(field)
      field.present? && !field.empty?
    end && !premium?
  end

  private

  def fetch_repos!
    FetchDeveloperReposWorker.perform_async(login, access_token)
  end

  def fetch_languages!
    FetchDeveloperLanguagesWorker.perform_async(login, access_token)
  end

  def fetch_orgs!
    FetchDeveloperOrgsWorker.perform_async(login, access_token)
  end

  def format_platforms
    self.platforms = platforms.join(',').split(',')
  end

  def set_premium!
    update!(premium: true)
  end

  def required_fields
    %w(bio email platforms location)
  end
end
