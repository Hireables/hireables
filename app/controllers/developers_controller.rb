class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: [:profile, :edit]
  before_action :set_developer, only: [:show, :edit]
  before_action :authenticate_recruiter!, only: :show

  # GET /:id
  def profile
    @developer = current_developer
  end

  def edit
  end

  # GET /:id
  def show
  end

  private

  def set_developer
    @login = params[:id]
    @developer = Developer.find_by_login(@login)
  end
end
