class SearchDevelopersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'urgent', retry: 5

  def perform(search_cache_key)
    params = Rails.cache.read(search_cache_key)
    api = Github::Api.new(params[:access_token])
    logins = api.search(params)

    logins.each do |login|
      next if Rails.cache.exist?(['developer', login, 'full'])
      FetchDeveloperWorker.perform_async(login, params[:access_token])
    end

  ensure
    ActiveRecord::Base.clear_active_connections!
    ActiveRecord::Base.connection.close
  end
end
