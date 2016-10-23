class Recruiter < ApplicationRecord
  store :preferences, accessors: [:language, :location], coder: JSON
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable, :validatable

  validates_presence_of :name, :company, :website
  validate :website_url_format, unless: :url_valid?
  before_create :add_login, unless: :login_present?
  after_commit :expire_search_query, if: :preferences_previously_changed?
  after_commit :send_admin_mail, on: :create
  mount_uploader :avatar, ImageUploader

  def active_for_authentication?
    super && verified?
  end

  def inactive_message
    if !verified?
      :not_verified
    else
      super
    end
  end

  private

  def login_present?
    login.present?
  end

  def add_login
    login_username = self.name.parameterize

    if Recruiter.find_by_login(login_username).blank?
      login_username = login_username
    else
      num = 1
      while Recruiter.find_by_login(login_username).blank?
        login_username = "#{name.parameterize}#{num}"
        num += 1
      end
    end

    self.login = login_username
  end

  def send_admin_mail
    AdminMailerWorker.perform_async(id)
  end

  def expire_search_query
    Rails.cache.delete('search_query')
  end

  def website_url_format
    errors.add(:website, ' must be a valid URL')
  end

  def url_valid?
    url = begin
            URI.parse(website)
          rescue
            false
          end
    url.is_a?(URI::HTTP) || url.is_a?(URI::HTTPS)
  end
end
