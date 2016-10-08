class PagesController < ApplicationController
  include RequestHelpers

  # GET /
  def home
    FetchDevelopersJob.perform_later(
      cache_key,
      request_uri
    ) unless key_cached?
  end
end
