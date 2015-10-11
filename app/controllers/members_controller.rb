class MembersController < ApplicationController
  # Setup params for the request
  include SetupRequestParams
  # Cache the request into Redis SET
  include CacheRequest
  # Generate uri based on params available
  include GenerateRequestUri

  # GET /members.json
  def index
    # Unless request cached fetch async members
    FetchMembersJob.perform_later(cache_key, request_uri,
      request_params.except!(:page, :q)
    ) unless key_cached?
    # Render page without blocking
    respond_to do |format|
      format.html
    end
  end

  # GET /members/search.json
  def search
    # Load members based on request params
    response = Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Client.new(request_uri, request_params.except!(:page, :q)).find
      # Cache formatted response
      {
        members: Github::Response.new(request).collection,
        rels: Pagination.new(request.headers).build
      }.to_json
    end

    # render response
    respond_to do |format|
      format.json {render json:  response}
    end
  end

end
