class MembersController < ApplicationController

  # GET /organizations/:organization_id/members
  # GET /organizations/:organization_id/members.json

  def index
    cache_key = "organization_members_#{params[:organization_id]}"

    @members = Rails.cache.fetch(cache_key, expires_in: 1.hour) do
      $github_client.organization_members(params[:organization_id]).map{|u| $github_client.user(u.login) }
    end

    respond_to do |format|
     format.html
     format.json {render json:  Oj.dump(@members, mode: :compat)}
    end
  end

end
