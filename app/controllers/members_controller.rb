class MembersController < ApplicationController
  # Setup params for the request
  include SetupRequestParams
  # Cache the request into Redis SET
  include CacheRequest
  # Generate uri based on params available
  include GenerateRequestUri

  # GET /members
  def index
    # Unless request cached fetch async members
    FetchMembersJob.perform_later(cache_key, request_uri,
      request_params.except!(:page, :q, :keyword)
    ) unless key_cached?

    # Render page without blocking
    respond_to do |format|
      format.html
    end
  end

  # GET /members/:username.json
  # GET /members/:username
  def show
    # Fetch from cache
    member = Rails.cache.fetch(["users", params[:id]], expires_in: 2.days) do
      request = Github::Client.new("/users/#{params[:id]}", {}).find
      if Github::Response.new(request).found?
        # Fetch user languages
        FetchMemberLanguagesJob.perform_later(params[:id])
        request.parsed_response
      else
        # Raise not found
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    # Fetch languages
    languages = Rails.cache.fetch(["users", params[:id], "languages"], expires_in: 2.days) do
      request = Github::Client.new("/users/#{params[:id]}/repos", {}).find.parsed_response
      Github::Response.new(request).user_languages_collection
    end

    # render response
    respond_to do |format|
      format.html
      format.json {render json:  {member: member, languages: languages} }
    end
  end

  # GET /members/search.json
  def search
    # Load members based on request params
    response = Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Client.new(request_uri, request_params.except!(:page, :q, :keyword)).find

      if Github::Response.new(request).found?
        # Cache formatted response
        {
          members: Github::Response.new(request).users_collection,
          rels: Pagination.new(request.headers).build
        }.to_json
      else
        # Raise not found
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    # render response
    respond_to do |format|
      format.json {render json:  response}
    end
  end

end
