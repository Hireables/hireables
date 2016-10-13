class DevelopersController < ApplicationController
  before_action :authenticate_developer!, :set_developer, only: :edit
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
    query = Github::Params.new(params).set
    SearchDevelopersWorker.perform_async(
      query,
      current_developer.try(:id)
    ) unless Rails.cache.exist?(query)
  end

  # GET /developers/:username
  def show
    FetchDeveloperWorker.perform_async(
      params[:id],
      current_developer.try(:id)
    ) unless Rails.cache.exist?(params[:id])

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  def edit
  end

  private

  def set_developer
    @developer = Developer.find_by_login(params[:id])
  end

  def developer_params
    params.require(:developer).permit(
      :city, :available, :remote, :relocate, :jobs, :platforms, :email, :page
    )
  end
end
