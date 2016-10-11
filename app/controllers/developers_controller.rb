class DevelopersController < ApplicationController
  include RequestHelpers
  before_action :set_developer, only: [:edit, :update]
  skip_before_action :ensure_signup_complete, only: [:edit, :update]
  after_action :set_premium!, only: :update, unless: :premium?

  # GET /developers
  def index
    SearchDevelopersJob.perform_now(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)

    FetchDevelopersJob.perform_later(
      [cache_key, 'collection']
    ) unless Rails.cache.exist?([cache_key, 'collection'])
  end

  # GET /developers/:username
  def show
    FetchDeveloperJob.perform_later(
      params[:id]
    ) unless Rails.cache.exist?(params[:id])

    FetchDeveloperLanguagesJob.perform_later(
      params[:id]
    ) unless Rails.cache.exist?([params[:id], 'languages'])

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  # POST /developers/search.json
  def search
    SearchDevelopersJob.perform_now(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)

    FetchDevelopersJob.perform_later(
      [cache_key, 'collection']
    ) unless Rails.cache.exist?([cache_key, 'collection'])

    respond_to do |format|
      format.json { head :ok }
    end
  end

  def edit
  end

  def update
    if @developer.update(developer_params)
      redirect_to @developer
    else
      flash[:notice] = "#{@developer.errors.full_messages.map{|m| m }.join(',')}"
      @show_errors = true
    end
  end

  private

  def set_premium!
    @developer.update!(premium: true)
  end

  def premium?
    @developer.premium?
  end

  def set_developer
    @developer = Developer.find_by_login(params[:id])
  end

  def developer_params
    params.require(:developer).permit(
      :city, :available, :remote, :relocate, :jobs, :platforms, :email, :page
    )
  end
end
