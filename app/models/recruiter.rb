class Recruiter < ApplicationRecord
  store :preferences, accessors: [:language, :location], coder: JSON
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable, :validatable

  validates_presence_of :name, :company, :website
  validate :website_url_format, unless: :url_valid?
  before_create :add_username, unless: :login_present?
  after_commit :expire_search_query, if: :preferences_previously_changed?
  after_commit :send_admin_mail, on: :create

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

  def add_login
    login_username = self.name.parameterize

    if User.find_by_login(login_username).blank?
      login_username = login_username
    else
      num = 1
      while User.find_by_login(login_username).blank?
        login_username = "#{name.parameterize}#{num}"
        num += 1
      end
    end

    self.username = login_username
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
