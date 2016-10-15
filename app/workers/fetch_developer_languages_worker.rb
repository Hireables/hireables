class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical'

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    api.fetch_developer_languages(login)
  end
end
