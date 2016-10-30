class SearchController < ApplicationController
  before_action :authenticate_recruiter!
  before_action :prepare_search_params!, :cache_query_metadata,
                :enqueue_search_worker

  protected

  def cache_query_metadata
    Rails.cache.write(search_cache_key, query_metadata)
  end

  def prepare_search_params!
    @search_params = PrepareSearchParams.new(
      search_params, current_recruiter
    )
  end

  def enqueue_search_worker
    SearchDevelopersWorker.perform_async(
      search_cache_key
    ) unless Rails.cache.exist?("#{search_cache_key}/worker")
  end

  private

  def query_metadata
    {
      query: @search_params.to_query,
      page: Integer(search_params['page'] || 1),
      access_token: current_recruiter.try(:access_token)
    }
  end

  def search_cache_key
    "search/recruiter/#{current_recruiter.id}"
  end

  def search_params
    params.permit(:first, :language, :location, :repos, :page)
  end
end
