class FetchDeveloperLanguagesWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'critical', retry: 5

  def perform(login, access_token)
    api = Github::Api.new(access_token)
    languages = api.fetch_developer_languages(login)

    # Update languages in a transaction block
    Developer.connection_pool.with_connection do
      developer = Developer.find_by_login(login)
      developer.update!(platforms: languages) unless developer.nil?
    end

  ensure
    ActiveRecord::Base.clear_active_connections!
    ActiveRecord::Base.connection.close
  end
end
