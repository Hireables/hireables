class DeveloperResolver
  attr_reader :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_user].present?
    @current_user = ctx[:current_user]
    safe_original_values = args.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_original_values)
    fetch_orgs
    fetch_languages
  end

  def call
    developer = Developer.find_by_login(params[:id])
    return developer unless developer.nil?
    api = Github::Api.new(current_user.try(:access_token))
    api.fetch_developer(params[:id])
  end

  def fetch_orgs
    FetchDeveloperOrgsWorker.new.perform(
      params[:id], current_user.try(:access_token)
    ) unless Rails.cache.exist?(['developer', params[:id], 'organizations'])
  end

  def fetch_languages
    FetchDeveloperLanguagesWorker.new.perform(
      params[:id], current_user.try(:access_token)
    ) unless Rails.cache.exist?(['developer', params[:id], 'languages'])
  end
end
