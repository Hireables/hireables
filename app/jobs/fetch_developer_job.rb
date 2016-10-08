class FetchDeveloperJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    # Cache developer response
    Rails.cache.fetch(username, expires_in: 2.days) do
      request = Github::Api.new("/users/#{username}").fetch
      if Github::Response.new(request).found?
        request.parsed_response
      else
        return false
      end
    end
  end
end
