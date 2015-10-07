class OrganizationsController < ApplicationController
  # GET /organizations
  # GET /organizations.json
  def index
    if params[:id].present?
      redirect_to organization_path(id: params[:id])
    else
      @organizations = Rails.cache.fetch("all_organizations_#{params[:page]}_expired", expires_in: 1.hour) do
        $github_client.all_orgs(since: 44).map{|org| $github_client.organization(org.login) }
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
         puts "404 : #{params[:id]} not found"
         puts e.message
      rescue Exception => e
        puts "you are screwed"
        puts "An error of type #{e.class} happened, message is #{e.message}"
      end
    end

    respond_to do |format|
      format.html
      format.json {render json: Oj.dump(@organization, :mode => :compat)}
    end
  end

end
