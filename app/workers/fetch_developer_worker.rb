class FetchDeveloperWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    api.fetch_developer(login)

    FetchDeveloperLanguagesWorker.perform_async(
      login, params[:access_token]
    ) unless Rails.cache.exist?([login, 'languages'])
  end
end
