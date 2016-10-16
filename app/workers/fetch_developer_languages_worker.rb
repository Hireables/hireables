class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical'

  def perform(login)
    api = Github::Api.new
    api.fetch_developer_languages(login)
  end
end
