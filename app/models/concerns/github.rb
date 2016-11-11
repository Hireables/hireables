module Github
  extend ActiveSupport::Concern

  private

  def fetch_repos
    @github_api ||= Github::Api.new(access_token)
    @github_api
      .fetch_developer_repos(developer.login)
      .lazy
      .sort_by(&:stargazers_count)
      .reverse!
      .to_a

    rescue NoMethodError
      [].to_json
  end
end
