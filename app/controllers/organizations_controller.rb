class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Octokit.organizations
    render json: @organizations
  end

  # GET /organizations/:username
  # GET /organizations/:username.json
  def show
    @organization = Octokit.organization(params[:username])
    render json: @organization
  end

end
