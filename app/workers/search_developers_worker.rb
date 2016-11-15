class SearchDevelopersWorker < Que::Job
  def run(search_cache_key)
    params = Rails.cache.read(search_cache_key)
    api = Github::Api.new(params[:access_token])
    logins = api.search(params)
    logins.each do |login|
      FetchDeveloperWorker.enqueue(login, params[:access_token])
    end
  end
end
