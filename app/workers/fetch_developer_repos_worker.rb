class FetchDeveloperReposWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    top_repos = api.fetch_top_developer_repos(login)

    # Update repos in a transaction block
    Developer.connection_pool.with_connection do |conn|
      developer = Developer.find_by_login(login)
      developer.update!(repos: top_repos)
    end
  end
end
