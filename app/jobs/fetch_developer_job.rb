class FetchDeveloperJob < ApplicationJob
  queue_as :urgent
  rescue_from ActiveRecord::RecordNotFound, &:message

  def perform(username)
    Developer.fetch_by_login(username)
  end
end
