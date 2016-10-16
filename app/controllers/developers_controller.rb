class DevelopersController < ApplicationController
  include SetSearchParams
  include CacheSearchParams
  include EnqueueSearchWorker

  before_action :authenticate_developer!, only: :edit
  before_action :set_developer, only: [:edit, :show]
  after_action :enqueue_languages_worker, only: :show
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
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
end
