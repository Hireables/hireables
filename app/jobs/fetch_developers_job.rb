class FetchDevelopersJob < ActiveJob::Base
  queue_as :urgent

  rescue_from ActiveRecord::RecordNotFound, &:message

  def perform(cache_key, request_uri)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)

      if response.found?
        request.parsed_response['items'].map{ |u| u['login'] }.map do |username|
          FetchDeveloperJob.perform_later(username)
        end

        response.developers_collection
      else
        return false
      end
    end
  end
end
