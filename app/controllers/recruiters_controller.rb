class RecruitersController < ApplicationController
  before_action :authenticate_recruiter!, only: [:edit, :show]
  before_action :set_recruiter, only: :show

  # GET /recruiters/:id
  def show
  end

  # GET /recruiters/:id/edit
  def edit
  end

  private

  def set_recruiter
    @login = params[:id]
    @recruiter = Recruiter.find_by_login(@login)
  end
end
