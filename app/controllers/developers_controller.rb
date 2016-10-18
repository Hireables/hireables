class DevelopersController < ApplicationController
  before_action :authenticate_developer!, :set_developer, only: [:edit, :show]
  skip_before_action :ensure_signup_complete, only: :edit

  # GET /developers
  def index
  end

  # GET /developers/:username
  def show
  end

  def edit
  end

  private

  def set_developer
    @login = params[:id]
    @developer = Developer.find_by_login(@login)
  end
end
