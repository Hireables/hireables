class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    if params[:id].present?
      redirect_to organization_path(id: params[:id])
    else
      # Fetch all org members
      orgs = Rails.cache.fetch("organizations_#{params[:page]}", expires_in: 1.hour) do
        $github_client.all_orgs(since: 1000, page: params[:page])
      end

      @organizations = Rails.cache.fetch("organizations_full_#{params[:page]}", expires_in: 1.hour) do
        orgs.map{|org| $github_client.organization(org.login) }.select{
            |o| o.public_repos > 5
          }
      end

      respond_to do |format|
        format.html
        format.json {render json: Oj.dump(@organizations, :mode => :compat)}
      end
    end
  end

  # GET /organizations/:id
  # GET /organizations/:id.json
  def show
    @organization = Rails.cache.fetch("organization_#{params[:id]}", expires_in: 1.hour) do
      begin
        $github_client.organization(params[:id])
      rescue Octokit::NotFound => e
        raise ActionController::RoutingError.new('Not Found')
      rescue Exception => e
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    respond_to do |format|
      format.html
      format.json {render json: Oj.dump(@organization, :mode => :compat)}
    end
  end

end
