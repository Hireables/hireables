class FetchDevelopersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)
      if response.found?
        response.developers_collection
      else
        return false
      end
    end
  end
end
