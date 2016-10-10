class DevelopersController < ApplicationController
  include RequestHelpers

  # GET /developers
  def index
    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)
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
    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)

    respond_to do |format|
      format.json { head :ok }
    end
  end
end
