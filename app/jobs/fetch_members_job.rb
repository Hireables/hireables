class FetchMembersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri, params)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)

      if response.found?
        # Fetch members async
        request.parsed_response['items'].map{|u| u['login']}.map{|username|
          FetchMemberJob.perform_later(username)
        }

        members = params[:hireable] ?
        response.hireable_collection : response.users_collection

        # Cache the JSON response
        {
          members: members,
          rels: Pagination.new(request.headers).build
        }.to_json
      else
        return false
      end
    end
  end
end
