class Employer < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable, :validatable

  store :preferences, accessors: [:language, :location], coder: JSON

  validates_presence_of :name, :company, :website, :login, :location
  validate :website_url_format, unless: :url_valid?

  before_validation :add_login, unless: :login_present?
  after_commit :notify_admin!, on: :create

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
    self.login = available_login
  end

  def available_login
    if Employer.find_by_login(name.parameterize).blank?
      name.parameterize
    else
      generate_login
    end
  end

  def generate_login
    num = 1
    login_username = name.parameterize
    while Employer.find_by_login(login_username).blank?
      login_username = "#{name.parameterize}#{num}"
      num += 1
    end
    login_username
  end

  def notify_admin!
    AdminMailerWorker.perform_async(self.class.name, id)
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
