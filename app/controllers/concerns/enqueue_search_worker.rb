module EnqueueSearchWorker
  extend ActiveSupport::Concern
  included do
    before_action :enqueue_search_worker!, only: :index
  end

  def enqueue_search_worker!
    SearchDevelopersWorker.perform_async(
      format_search_params.to_cache_key
    ) unless Rails.cache.exist?(format_search_params.to_cache_key)
  end
end
