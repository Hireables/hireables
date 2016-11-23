module Github
  extend ActiveSupport::Concern

  def fetch_repos
    repos.zip(pulls).flatten
  rescue NoMethodError
    []
  end

  private

  def repos
    github_api
      .search_developer_repos(developer.login)
      .lazy
      .map do |repo|
        repo['category'] = 'repo'
        HashWithIndifferentAccess.new(repo.to_hash).except(*repo_fields)
      end.to_a.take(20)
  end

  def pulls
    github_api
      .search_developer_pulls(developer.login)
      .lazy
      .map do |pr|
        pr['category'] = 'pr'
        HashWithIndifferentAccess.new(pr.to_hash).except(*pr_fields)
      end.to_a.take(20)
  end

  def github_api
    @github_api ||= Github::Api.new(access_token)
  end

  def pr_fields
    %w(user pull_request)
  end

  def repo_fields
    %w(
      owner forks_url keys_url collaborators_url teams_url hooks_url
      issue_events_url events_url assignees_url branches_url tags_url
      blobs_url git_tags_url git_refs_url trees_url statuses_url languages_url
      stargazers_url contributors_url subscribers_url subscription_url
      commits_url git_commits_url comments_url issue_comment_url contents_url
      compare_url merges_url archive_url downloads_url issues_url pulls_url
      milestones_url notifications_url labels_url releases_url deployments_url
      git_url ssh_url clone_url svn_url mirror_url
    )
  end
end
