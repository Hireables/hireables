class CacheChannel < ApplicationCable::Channel
  def set(params)
    stop_all_streams
    query = Github::Params.new(params).set

    api = Github::Api.new(current_developer.try(:id))
    api.token = current_developer.access_token unless current_developer.nil?
    search = api.search(query)

    search.items.each do |item|
      FetchDeveloperWorker.new.perform(
        item.login,
        current_developer.try(:id)
      ) unless Rails.cache.exist?(item.login)
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
