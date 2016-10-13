class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical'

  def perform(login, current_developer_id)
    developer = Developer.find_by_id(current_developer_id)
    api = Github::Api.new(current_developer_id)
    api.token = developer.access_token unless developer.nil?
    api.fetch_developer_languages(login)
  end
end
