class FetchDevelopersJob < ActiveJob::Base
  queue_as :urgent

  def perform(cache_key, request_uri, params)
    Rails.cache.fetch(cache_key, expires_in: 2.days) do
      request = Github::Api.new(request_uri).fetch
      response = Github::Response.new(request)

      if response.found?
        # Fetch developers async
        request.parsed_response['items'].map{|u| u['login']}.map{|username|
          FetchDeveloperJob.perform_later(username)
        }

        developers = params[:hireable] ?
        response.hireable_collection : response.developers_collection

        # Cache the JSON response
        {
          developers: developers,
          rels: Pagination.new(request.headers).build
        }.to_json
      else
        return false
      end
    end
  end
end
