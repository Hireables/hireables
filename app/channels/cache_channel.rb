class CacheChannel < ApplicationCable::Channel
  def set(params)
    stop_all_streams
    search = api.search(Github::Params.new(params).set)
    search.items.each do |item|
      FetchDeveloperWorker.perform_async(
        item.login,
        current_developer.try(:id)
      ) unless Rails.cache.exist?(item.login)
    end
  end

  def unsubscribed
    stop_all_streams
  end

  private

  def api
    Github::Api.new(current_developer.access_token)
  end
end
