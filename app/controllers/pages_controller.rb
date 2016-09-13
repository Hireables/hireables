class PagesController < ApplicationController
  # Setup params for the request
  include SetupRequestParams
  include CacheRequest
  include GetApiUri

  def home
    # Unless request cached fetch async developers
    FetchDevelopersJob.perform_later(cache_key, request_uri, params
    ) unless key_cached?

    respond_to do |format|
      format.html
    end
  end
end
