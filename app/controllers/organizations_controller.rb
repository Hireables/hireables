class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Rails.cache.fetch("all_organizations_#{params[:page]}_expired", expires_in: 1.hour) do
      $github_client.all_orgs(since: 44).map{|org| $github_client.organization(org.login) }
    end
    respond_to do |format|
      format.html
      format.json {render json: Oj.dump(@organizations, :mode => :compat)}
    end
  end

  # GET /organizations/:id
  # GET /organizations/:id.json
  def show
    @organization = Rails.cache.fetch("organization_#{params[:id]}", expires_in: 1.hour) do
      $github_client.organization(params[:id])
    end
    @members = Rails.cache.fetch("organization_members_#{params[:id]}", expires_in: 1.hour) do
      $github_client.organization_members(params[:id]).map{|u| $github_client.user(u.login) }
    end
    respond_to do |format|
      format.html
      format.json {render json: {org: Oj.dump(@organization, :mode => :compat), members: Oj.dump(@members, mode: :compat) }}
    end
  end

end
