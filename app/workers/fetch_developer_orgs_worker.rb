class FetchDeveloperOrgsWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    orgs = api.fetch_developer_orgs(login)
  end
end