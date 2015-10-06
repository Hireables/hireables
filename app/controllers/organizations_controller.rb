class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = $github_client.all_organizations
    respond_to do |format|
      format.html
      format.json {render json: @organizations}
    end
  end

  # GET /organizations/:id
  # GET /organizations/:id.json
  def show
    @organization = $github_client.organization(params[:id])
    render json: @organization
  end

end
