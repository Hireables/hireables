class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(search_cache_key)
    params = Rails.cache.read(search_cache_key)
    api = Github::Api.new(params[:access_token])
    logins = api.search(params)

    logins.each do |login|
      FetchDeveloperWorker.perform_async(
        login, params[:access_token]
      ) unless Rails.cache.exist?(['developer', login, 'full'])
    end
  end
end
