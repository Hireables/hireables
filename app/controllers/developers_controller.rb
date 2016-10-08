class DevelopersController < ApplicationController
  include RequestHelpers

  # GET /developers
  def index
    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless key_cached?
  end

  # GET /developers/:username
  def show
    FetchDeveloperJob.perform_later(params[:id])
    FetchDeveloperLanguagesJob.perform_later(params[:id])
  end

  # POST /developers/search.json
  def search
    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless key_cached?
    end

    respond_to do |format|
      format.json { head :ok }
    end
  end
end
