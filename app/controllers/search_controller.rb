class SearchController < ApplicationController
  before_action :authenticate_user!
  before_action :prepare_search_params!, :cache_query_metadata,
                :enqueue_search_worker, only: :index

  def index
  end

  private

  def cache_query_metadata
    Rails.cache.write(search_cache_key, query_metadata)
  end

  def query_metadata
    {
      query: @search_params.to_query,
      page: Integer(search_params['page'] || 1),
      access_token: current_recruiter.try(:access_token)
    }
  end

  def prepare_search_params!
    @search_params = PrepareSearchParams.new(
      search_params, current_recruiter
    )
  end

  def search_cache_key
    "search/recruiter/#{current_recruiter.id}"
  end

  def enqueue_search_worker
    SearchDevelopersWorker.perform_async(
      search_cache_key
    ) unless Rails.cache.exist?("#{search_cache_key}/worker")
  end

  def search_params
    params.permit(:location, :language, :hireable, :page, :repos)
  end
end
