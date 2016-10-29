class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(search_cache_key)
    params = Rails.cache.read(search_cache_key)
    api = Github::Api.new(params[:access_token])

    search = api.search(params)
    search.items.each do |item|
      FetchDeveloperWorker.perform_async(
        item.login, params[:access_token]
      ) unless Rails.cache.exist?(['developer', item.login])
    end
  end
end
