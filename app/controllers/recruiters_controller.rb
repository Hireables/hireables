class RecruitersController < ApplicationController
  before_action :authenticate_recruiter!,
  :set_recruiter, only: :show, unless: :authenticated?

  # GET /:id
  def show
  end

  private

  def set_recruiter
    @login = params[:id].to_h
  end

  def authenticated?
    recruiter_signed_in? || developer_signed_in?
  end
end
