class PagesController < ApplicationController
  include CacheSearchParams
  before_action :cache_search_params!, only: :home

  # GET /
  def home
    SearchDevelopersWorker.perform_async(
      search_cache_key
    ) unless Rails.cache.exist?(search_cache_key)
  end

  private

  def search_params
    params.permit(:fullname, :location, :language, :hireable, :page)
  end
end
