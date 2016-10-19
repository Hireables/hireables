class SearchController < ApplicationController
  before_action :authenticate_recruiter!, only: :index
  before_action :check_search_params!, :cache_search_params, only: :index

  def index
    SearchDevelopersWorker.perform_async(@search_params.to_cache_key)
  end

  private

  def check_search_params!
    @search_params = FormatSearchParams.new(search_params)
    redirect_to root_path and return unless @search_params.valid?
  end

  def cache_search_params
    Rails.cache.fetch(@search_params.to_cache_key, expires: 2.days) do
      {
        query: @search_params.to_query,
        page: search_params['page'] || 1
      }
    end
  end

  def search_params
    params.permit(
      :followers, :repos, :fullname, :location,
      :language, :hireable, :page
    )
  end
end
