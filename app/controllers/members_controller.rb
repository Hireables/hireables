class MembersController < ApplicationController

  # GET /organizations/:organization_id/members.json
  def index

    # Fetch all org members
    @org_members = Rails.cache.fetch(org_cache_key, expires_in: 1.hour) do
      GITHUB_CLIENT.organization_members(params[:organization_id], page: params[:page])
    end

    # Hack to setup pagination as Sawyer:Resource fetches last response
    @rels = Rails.cache.fetch(org_cache_key + "_rels", expires_in: 1.hour) do
      rels = GITHUB_CLIENT.last_response.rels
      { next: rels[:next].present?, prev: rels[:prev].present? }
    end

    # If hireable members // load full member object :: Expensive call
    if params[:hireable] == "true"
      @members = Rails.cache.fetch(members_cache_key + "_hireable", expires_in: 1.hour) do
        @org_members.map{ |u| GITHUB_CLIENT.user(u.login)}.select{
            |member| member.hireable
        }
      end
    else
      # Fetch members data
      @members = Rails.cache.fetch(members_cache_key, expires_in: 1.hour) do
        @org_members.map{ |u| GITHUB_CLIENT.user(u.login) }
      end
    end

    respond_to do |format|
     format.json {render json:  {members: Oj.dump(@members), links: Oj.dump(@rels)}}
    end
  end

  private

  def org_cache_key
    "org_members_#{params[:organization_id]}_#{params[:page]}"
  end

  def members_cache_key
    "members_#{params[:organization_id]}_#{params[:page]}"
  end

end
