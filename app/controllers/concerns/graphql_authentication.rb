module GraphqlAuthentication
  extend ActiveSupport::Concern

  included do
    before_action :find_current_recruiter, :find_current_developer
    before_action :render_unauthorised, unless: :authenticated?
  end

  def authenticated?
    find_current_user.present?
  end

  def find_current_user
    @find_current_recruiter || @find_current_developer
  end

  def find_current_recruiter
    @find_current_recruiter ||= Recruiter.find_by_login(
      cookies.signed['recruiter.login']
    ) unless cookies.signed['recruiter.login'].nil?
  end

  def find_current_developer
    @find_current_developer ||= Developer.find_by_login(
      cookies.signed['developer.login']
    ) unless cookies.signed['developer.login'].nil?
  end
end
