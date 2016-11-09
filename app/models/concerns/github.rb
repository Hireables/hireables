module Github
  extend ActiveSupport::Concern

  def fetch_repos
    @github_api ||= Github::Api.new(access_token)
    @github_api
    .fetch_developer_repos(developer.login)
    .lazy
    .sort_by(&:stargazers_count)
    .reverse!
    .to_a
  end
end
