class CacheChannel < ApplicationCable::Channel
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def set(params)
    search_params = FormatSearchParams.new(params)

    api.search(
      query: search_params.to_query,
      cache_key: search_params.to_cache_key,
      page: params['page'] || 1
    ).items.each do |item|
      FetchDeveloperWorker.perform_async(
        item.login
      ) unless Rails.cache.exist?(item.login)
    end
  end

  def unsubscribed
    stop_all_streams
  end

  private

  def api
    Github::Api.new
  end
end
