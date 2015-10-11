class PagesController < ApplicationController
  # Setup params for the request
  include SetupRequestParams
  # Cache the request into Redis SET
  include CacheRequest
  # Generate uri based on params available
  include GenerateRequestUri

  def home
    # Unless request cached fetch async members
    FetchMembersJob.perform_later(cache_key, request_uri,
      request_params.except!(:page, :q)
    ) unless key_cached?

    # Respond with HTML
    respond_to do |format|
      format.html
    end
  end

end