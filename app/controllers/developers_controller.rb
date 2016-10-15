class DevelopersController < ApplicationController
  include CacheSearchParams
  before_action :authenticate_developer!, only: :edit
  before_action :cache_search_params!, only: :index
  before_action :set_developer, only: [:edit, :show]
  after_action :enqueue_languages_worker, only: :show
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
    SearchDevelopersWorker.perform_async(
      search_cache_key
    ) unless Rails.cache.exist?(search_cache_key)
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

  def enqueue_languages_worker
    FetchDeveloperLanguagesWorker.perform_async(
      params[:id],
      current_developer.try(:access_token)
    ) unless Rails.cache.exist?([params[:id], 'languages'])
  end

  def set_developer
    @developer = Developer.find_by_login(params[:id])
  end

  def search_params
    params.permit(:fullname, :location, :language, :hireable, :page)
  end

  def developer_params
    params.require(:developer).permit(
      :city, :available, :remote, :relocate, :jobs, :platforms, :email, :page
    )
  end
end
