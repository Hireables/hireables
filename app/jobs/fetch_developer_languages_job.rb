class FetchDeveloperLanguagesJob < ApplicationJob
  queue_as :urgent

  def perform(username)
    Developer.fetch_languages_from_github(username)
  end
end
