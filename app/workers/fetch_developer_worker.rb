class FetchDeveloperWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(login, current_developer_id)
    developer = Developer.find_by_id(current_developer_id) unless current_developer_id.nil?
    api = Github::Api.new(current_developer_id)
    api.token = developer.access_token unless current_developer_id.nil?
    api.fetch_developer(login)
  end
end
