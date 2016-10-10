class PagesController < ApplicationController
  include RequestHelpers

  # GET /
  def home
    FetchDevelopersJob.perform_later(
      cache_key,
      github_api_uri
    ) unless Rails.cache.exist?(cache_key)
  end
end
