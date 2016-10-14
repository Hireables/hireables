class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical'

  def perform(login, current_developer_id)
    developer = Developer.find_by_id(
      current_developer_id
    ) unless current_developer_id.nil?
    api = Github::Api.new(developer.try(:access_token))
    api.fetch_developer_languages(login)
  end
end
