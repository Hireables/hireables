class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: [:edit, :search, :home, :show]
  before_action :check_search_params!, :cache_search_params, only: :search
  before_action :set_developer, only: [:edit, :show]
  after_action :enqueue_languages_worker, only: :show
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
  end

  # GET /developers/search
  def search
  end

  # GET /developers/:username
  def show
    FetchDeveloperWorker.perform_async(
      @login
    ) unless Rails.cache.exist?(@login)

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  def home
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
        query: @search_params.to_query,
        page: search_params['page'] || 1
      }
    end
  end

  def enqueue_languages_worker
    FetchDeveloperLanguagesWorker.perform_async(
      params[:id]
    ) unless Rails.cache.exist?([params[:id], 'languages'])
  end

  def search_params
    params.permit(
      :followers, :repos, :fullname, :location,
      :language, :hireable, :page
    )
  end

  def set_developer
    @login = params[:id]
    @developer = Developer.find_by_login(@login)
  end
end
