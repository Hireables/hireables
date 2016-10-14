class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent'

  def perform(query, current_developer_id)
    developer = Developer.find_by_id(
      current_developer_id
    ) unless current_developer_id.nil?
    api = Github::Api.new(developer.try(:access_token))
    api.search(query)
  end
end
