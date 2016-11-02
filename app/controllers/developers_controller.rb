class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: [:profile, :edit]
  before_action :authenticate_user!, only: :show
  before_action :set_developer, only: [:show, :edit]

  # GET /:id
  def profile
    @developer = current_developer
  end

  def edit
  end

  # GET /:id
  def show
    FetchDeveloperLanguagesWorker.perform_async(
      params[:id], current_user.try(:access_token)
    ) unless Rails.cache.exist?(['developer', params[:id], 'languages'])
  end

  private

  def set_developer
    @login = params[:id]
    @developer = Developer.find_by_login(@login)
  end
end
