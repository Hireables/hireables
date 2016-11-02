class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    languages = api.fetch_developer_languages(login)

    # Update languages in a transaction block
    Developer.connection_pool.with_connection do |conn|
      developer = Developer.find_by_login(login)
      return unless developer.present?
      developer.update!(platforms: languages)
    end
  end
end
