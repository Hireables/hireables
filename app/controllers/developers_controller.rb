class DevelopersController < ApplicationController
  before_action :authenticate_developer!, only: :profile
  before_action :authenticate_recruiter!, :set_developer, only: :show

  # GET /:id
  def profile
  end

  # GET /:id
  def show
  end

  private

  def set_developer
    @login = params[:id].to_h
  end
end
