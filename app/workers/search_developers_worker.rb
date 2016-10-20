class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform
    params = Rails.cache.read('search_query')
    api = Github::Api.new

    search = api.search(params)
    search.items.each do |item|
      FetchDeveloperWorker.perform_async(
        item.login
      ) unless Rails.cache.exist?(item.login)
    end
  end
end
