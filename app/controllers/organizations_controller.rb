class OrganizationsController < ApplicationController

  # GET /organizations
  # GET /organizations.json
  def index
    if params[:id].present?
      redirect_to organization_path(id: params[:id])
    else

      @organizations = Rails.cache.fetch("all_orgs", expires_in: 1.hour) do
        $github_client.all_orgs(since: 1000).map{|org| $github_client.organization(org.login) }.select{
            |o| o.public_repos > 5
          }
      end

      respond_to do |format|
        format.html
        format.json {render json: Oj.dump(@organizations)}
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
      format.json {render json: Oj.dump(@organization)}
    end
  end

end
