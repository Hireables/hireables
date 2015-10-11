class FetchMembersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri, params)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Client.new(request_uri, params).find
      # Fetch members async
      request.parsed_response["items"].map{|u| u["login"]}.map{|username|
        FetchMemberJob.perform_later(username)
      }
      # Cache the JSON response
      {
        members: Github::Response.new(request).collection,
        rels: Pagination.new(request.headers).build
      }.to_json
    end

  end

end