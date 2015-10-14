class FetchMembersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      if Github::Response.new(request).found?
        # Fetch members async
        request.parsed_response["items"].map{|u| u["login"]}.map{|username|
          FetchMemberJob.perform_later(username)
        }
        # Cache the JSON response
        {
          members: Github::Response.new(request).users_collection,
          rels: Pagination.new(request.headers).build
        }.to_json
      else
        return false
      end
    end

  end

end