class FetchDeveloperLanguagesJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    Rails.cache.fetch([username, 'languages'], expires_in: 2.days) do
      request = Github::Api.new("/users/#{username}/repos").fetch
      if Github::Response.new(request).found?
        Github::Response.new(request.parsed_response).developer_languages_collection
      else
        return false
      end
    end
  end
end
