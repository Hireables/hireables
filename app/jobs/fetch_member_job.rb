class FetchMemberJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    # Cache user response
    Rails.cache.fetch(["users", username], expires_in: 2.days) do
      request = Github::Client.new("/users/#{username}", {}).find
      # Fetch user languages
      FetchMemberLanguagesJob.perform_later(username) unless request.parsed_response.empty?
      request.parsed_response
    end
  end

end