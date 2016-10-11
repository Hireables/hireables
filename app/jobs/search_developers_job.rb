class SearchDevelopersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)
      raise StandardError, '404 not found' unless response.found?

      OpenStruct.new({
        logins: response.logins,
        results: response.results
      })
    end
  end
end
