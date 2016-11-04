class SearchController < ApplicationController
  before_action :authenticate_user!
  before_action :prepare_search_params!, :cache_query_metadata,
                :enqueue_search_worker

  protected

  def cache_query_metadata
    Rails.cache.write(search_cache_key, query_metadata)
  end

  def prepare_search_params!
    @prepared_params = PrepareSearchParams.new(search_params, current_user)
  end

  def enqueue_search_worker
    Rails.cache.fetch([@prepared_params.to_query, 'worker']) do
      SearchDevelopersWorker.perform_async(search_cache_key)
    end
  end

  private

  def query_metadata
    {
      query: @prepared_params.to_query,
      page: Integer(search_params[:page] || 1),
      access_token: current_user.try(:access_token)
    }
  end

  def search_cache_key
    "search/#{current_user.class.name.downcase}/#{current_user.id}"
  end

  def search_params
    params.permit(:first, :language, :location, :repos, :page)
  end
end
