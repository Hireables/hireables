class MembersController < ApplicationController
  # Common controller concerns
  include SetupRequestParams
  include CacheRequest
  include GetApiUri

  # GET /members
  def index
    # Unless request cached fetch members async
    FetchMembersJob.perform_later(cache_key, request_uri, params
    ) unless key_cached?

    respond_to do |format|
      format.html
    end
  end

  # GET /members/:username.json
  # GET /members/:username
  def show
    # Fetch from cache
    @member = Rails.cache.fetch(['users', params[:id]], expires_in: 2.days) do
      request = Github::Api.new("/users/#{params[:id]}").fetch
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
    @languages = Rails.cache.fetch(['users', params[:id], 'languages'], expires_in: 2.days) do
      request = Github::Api.new("/users/#{params[:id]}/repos").fetch
      Github::Response.new(request.parsed_response).user_languages_collection
    end

    respond_to do |format|
      format.html
      format.json {render json:  {member: @member, languages: @languages} }
    end
  end

  # GET /members/search.json
  def search
    # Load members based on request params
    response = Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)

      if response.found?

        members = params[:hireable] ? response.hireable_collection : response.users_collection

        # Cache formatted response
        {
          members: members,
          rels: Pagination.new(request.headers).build
        }.to_json
      else
        # Raise not found
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    respond_to do |format|
      format.json {render json:  response}
    end
  end
end
