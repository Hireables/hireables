class FetchDeveloperOrgsWorker < Que::Job
  def run(login, access_token)
    api = Github::Api.new(access_token)
    api.fetch_developer_orgs(login)
  end
end
