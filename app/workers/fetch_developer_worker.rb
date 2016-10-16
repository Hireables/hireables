class FetchDeveloperWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(login)
    api = Github::Api.new
    api.fetch_developer(login)
  end
end
