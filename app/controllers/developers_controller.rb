class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: [:profile, :edit]
  before_action :set_developer, only: [:show, :edit]
  before_action :authenticate_recruiter!, only: :show

  # GET /:id
  def profile
  end

  def edit
  end

  # GET /:id
  def show
    FetchDeveloperLanguagesWorker.perform_async(
      @login
    ) unless Rails.cache.exist?([@login, 'languages'])
  end

  private

  def set_developer
    @login = params[:id]
  end
end
