class SearchController < ApplicationController
  before_action :authenticate_recruiter!, only: :index
  before_action :prepare_search_params!, :cache_query_metadata, only: :index

  def index
    SearchDevelopersWorker.perform_async(
      @search_params.search_cache_key
    ) unless Rails.cache.exist?(@search_params.search_cache_key)
  end

  private

  def cache_query_metadata
    Rails.cache.write(search_cache_key, query_metadata)
  end

  def query_metadata
    {
      query: @search_params.to_query,
      page: Integer(search_params[:page] || 1),
      search: @search_params.valid?
    }
  end

  def prepare_search_params!
    @search_params = PrepareSearchParams.new(
      search_params, current_recruiter
    )
  end

  def search_params
    params.permit(:location, :language, :hireable, :page, :repos)
  end
end
