class FetchDevelopersJob < ApplicationJob
  queue_as :urgent

  rescue_from ActiveRecord::RecordNotFound, &:message

  def perform(cache_key)
    search = Rails.cache.read(cache_key)
    Rails.cache.fetch([cache_key, 'collection'], expires_in: 2.days) do
      search.logins.map do |username|
        Developer.fetch_by_login(username)
      end
    end unless search.nil?
  end
end
