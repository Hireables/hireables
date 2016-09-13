class DevelopersController < ApplicationController
  # Common controller concerns
  include SetupRequestParams
  include CacheRequest
  include GetApiUri

  # GET /developers
  def index
    # Unless request cached fetch developers async
    FetchDevelopersJob.perform_later(cache_key, request_uri, params
    ) unless key_cached?

    respond_to do |format|
      format.html
    end
  end

  # GET /developers/:username.json
  # GET /developers/:username
  def show
    # Fetch from cache
    @developer = Rails.cache.fetch(['developers', params[:id]], expires_in: 2.days) do
      request = Github::Api.new("/users/#{params[:id]}").fetch
      if Github::Response.new(request).found?
        # Fetch user languages
        FetchDeveloperLanguagesJob.perform_later(params[:id])
        request.parsed_response
      else
        # Raise not found
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    # Fetch languages
    @languages = Rails.cache.fetch(['developers', params[:id], 'languages'], expires_in: 2.days) do
      request = Github::Api.new("/users/#{params[:id]}/repos").fetch
      Github::Response.new(request.parsed_response).developer_languages_collection
    end

    respond_to do |format|
      format.html
      format.json {render json:  {developer: @developer, languages: @languages} }
    end
  end

  # GET /developers/search.json
  def search
    # Load developers based on request params
    response = Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)

      if response.found?

        developers = if params[:hireable]
                      response.hireable_collection
                     else
                      response.developers_collection
                     end

        # Cache formatted response
        {
          developers: developers,
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
