class FetchDevelopersJob < ActiveJob::Base
  queue_as :urgent

  rescue_from ActiveRecord::RecordNotFound, &:message

  def perform(cache_key)
    search = Rails.cache.read(cache_key)

    Rails.cache.fetch([cache_key, 'collection'], expires_in: 2.days) do
      response.developers_collection
    end unless search.nil? && search.logins.any?
  end
end
