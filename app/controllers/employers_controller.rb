class EmployersController < ApplicationController
  before_action :authenticate_employer!, only: :edit
  before_action :authenticate_user!, except: :edit
  before_action :set_employer, only: [:show, :edit]

  # GET /employers/:id
  def show
  end

  # GET /employers/:id/edit
  def edit
  end

  private

  def set_employer
    @login = params[:id]
    @employer = Employer.find_by_login!(@login)
    redirect_to root_path unless @employer == current_employer
  end
end
