class FetchDeveloperLanguagesJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    Rails.cache.fetch(['developers', username, 'languages'], expires_in: 2.days) do
      # Find developer repos
      request = Github::Api.new("/users/#{username}/repos").fetch
      if Github::Response.new(request).found?
        # Map uniq! repo languages for developer
        Github::Response.new(request.parsed_response).developer_languages_collection
      else
        return false
      end
    end
  end
end
