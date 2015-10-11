class FetchMemberJob < ActiveJob::Base
  queue_as :urgent

  def perform(username)
    Rails.cache.fetch(["users", username], expires_in: 2.days) do
      Github::Client.new("/users/#{username}", {}).find.parsed_response
    end
  end

end