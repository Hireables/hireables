class SearchController < ApplicationController
  before_action :authenticate_employer!
  before_action :prepare_search_params!, :cache_query_metadata,
                :enqueue_search_worker
  after_action :save_search, unless: :search_saved?

  def index
    @searches = current_employer
                .searches
                .order(id: :desc)
                .select(:params, :id, :created_at)
                .limit(3)
  end

  protected

  def cache_query_metadata
    Rails.cache.write(search_cache_key, query_metadata)
  end

  def prepare_search_params!
    @prepared_params = PrepareSearchParams.new(search_params, current_user)
  end

  def enqueue_search_worker
    hex_string = Digest::SHA256.hexdigest(@prepared_params.to_props.to_s)
    Rails.cache.fetch([hex_string, 'worker']) do
      SearchDevelopersJob.enqueue(search_cache_key)
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

  def save_search
    return if search_params.empty?
    Search.create(params: search_params, employer: current_employer)
  end

  def search_saved?
    return true if search_params.empty?
    Search.where(params: search_params).exists?
  end

  def search_params
    params.permit(:first, :language, :location, :repos, :page)
  end
end
