class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = $github_client.all_orgs since: 44
    rels = $github_client.last_response.rels
    @organizations.concat(rels[:next].get.data)
    respond_to do |format|
      format.html
      format.json {render json: Oj.dump(@organizations, :mode => :compat)}
    end
  end

  # GET /organizations/:id
  # GET /organizations/:id.json
  def show
    @organization = $github_client.organization(params[:id])
    render json: @organization
  end

end
