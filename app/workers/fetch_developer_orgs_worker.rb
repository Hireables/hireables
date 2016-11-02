class FetchDeveloperOrgsWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    orgs = api.fetch_developer_orgs(login)

    # Update orgs in a transaction block
    Developer.connection_pool.with_connection do |conn|
      developer = Developer.find_by_login(login)
      developer.update!(orgs: orgs)
    end
  end
end
