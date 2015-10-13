class FetchMemberLanguagesJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    Rails.cache.fetch(["users", username, "languages"], expires_in: 2.days) do
      # Find user repos
      request = Github::Client.new("/users/#{username}/repos").fetch
      # Map uniq! repo languages for user
      Github::Response.new(request.parsed_response).user_languages_collection
    end
  end

end