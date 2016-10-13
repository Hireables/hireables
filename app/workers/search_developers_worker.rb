class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(query, current_developer_id)
    developer = Developer.find_by_id(current_developer_id)
    api = Github::Api.new(current_developer_id)
    api.token = developer.access_token unless developer.nil?
    api.search(query)
  end
end
