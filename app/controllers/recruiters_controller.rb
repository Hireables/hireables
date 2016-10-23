class RecruitersController < ApplicationController
  before_action :set_recruiter, only: :show
  before_action :authenticate_recruiter!, only: :show, unless: :user_signed_in?

  # GET /:id
  def show
  end

  private

  def set_recruiter
    @login = params[:id]
  end
end
