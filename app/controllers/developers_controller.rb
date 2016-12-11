class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: [:profile, :edit]
  skip_before_action :show_developer_edit!, only: :edit
  before_action :set_developer, only: [:show, :edit]

  # GET /:id
  def profile
    @developer = current_developer
  end

  def edit
    redirect_to root_path && return if @developer != current_developer
  end

  # GET /:id
  def show
    fetch_developer
    fetch_orgs
    fetch_languages

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  private

  def fetch_developer
    return if Rails.cache.exist?(['developer', params[:id], 'full'])
    FetchDeveloperJob.enqueue(params[:id], current_user.try(:access_token))
  end

  def fetch_orgs
    return if Rails.cache.exist?(['developer', params[:id], 'organizations'])
    FetchDeveloperOrgsJob.enqueue(params[:id], current_user.try(:access_token))
  end

  def fetch_languages
    return if Rails.cache.exist?(['developer', params[:id], 'languages'])
    FetchDeveloperLanguagesJob.enqueue(
      params[:id],
      current_user.try(:access_token)
    )
  end

  def set_developer
    @login = params[:id]
    @developer = Developer.find_by_login(@login)
  end
end
