class PagesController < ApplicationController
  include CacheSearchParams

  # GET /
  def home
    SearchDevelopersWorker.perform_async(
      search_cache_key
    ) unless Rails.cache.exist?(search_cache_key)
  end
end
