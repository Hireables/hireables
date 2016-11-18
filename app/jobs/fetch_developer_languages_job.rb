class FetchDeveloperLanguagesJob < Que::Job
  def run(login, access_token)
    api = Github::Api.new(access_token)
    languages = api.fetch_developer_languages(login)

    ActiveRecord::Base.transaction do
      developer = Developer.find_by_login(login)
      developer.update!(languages: languages) unless developer.nil?
      destroy
    end

  rescue ActiveRecord::RecordNotFound
    'No connection found'
  end
end
