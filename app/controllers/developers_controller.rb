class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: :edit
  before_action :check_search_params!, :cache_search_params, only: :search
  before_action :set_developer, only: [:edit, :show]
  after_action :enqueue_languages_worker, only: :show
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
  end

  # GET /developers/search
  def search
    SearchDevelopersWorker.perform_async(
      @search_params.to_cache_key
    ) unless Rails.cache.exist?(@search_params.to_cache_key)
  end

  # GET /developers/:username
  def show
    FetchDeveloperWorker.perform_async(
      params[:id],
      current_developer.try(:access_token)
    ) unless Rails.cache.exist?(params[:id])

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  def edit
  end

  private

  def check_search_params!
    @search_params = FormatSearchParams.new(search_params)
    redirect_to root_path and return unless @search_params.valid?
  end

  def cache_search_params
    Rails.cache.fetch(@search_params.to_cache_key, expires: 2.days) do
      {
        query: format_search_params.to_query,
        cache_key: @search_params.to_cache_key,
        page: search_params['page'] || 1,
        access_token: current_developer.try(:access_token)
      }
    end
  end

  def enqueue_languages_worker
    FetchDeveloperLanguagesWorker.perform_async(
      params[:id],
      current_developer.try(:access_token)
    ) unless Rails.cache.exist?([params[:id], 'languages'])
  end

  def search_params
    params.permit(
      :followers, :repos, :fullname, :location,
      :language, :hireable, :page
    )
  end

  def set_developer
    @developer = Developer.find_by_login(params[:id])
  end
end
