module GraphqlAuthentication
  extend ActiveSupport::Concern

  included do
    before_action :find_current_employer, :find_current_developer
    before_action :render_unauthorised, unless: :authenticated?
  end

  def authenticated?
    find_current_user.present?
  end

  def find_current_user
    @find_current_employer || @find_current_developer
  end

  def find_current_employer
    return if cookies.signed['employer.login'].nil?
    @find_current_employer ||= Employer.find_by_login(
      cookies.signed['employer.login']
    )
  end

  def find_current_developer
    return if cookies.signed['developer.login'].nil?
    @find_current_developer ||= Developer.find_by_login(
      cookies.signed['developer.login']
    )
  end
end
