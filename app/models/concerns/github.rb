module Github
  extend ActiveSupport::Concern

  private

  def fetch_repos
    @github_api ||= Github::Api.new(access_token)
    @github_api.fetch_developer_repos(developer.login).take(20)
  rescue NoMethodError
    []
  end
end
