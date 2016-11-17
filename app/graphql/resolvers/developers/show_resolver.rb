module Developers
  class ShowResolver
    attr_reader :params, :current_user

    def self.call(*args)
      new(*args).call
    end

    def initialize(_developer, args, ctx)
      @current_user = ctx[:current_user]
      safe_params = args.instance_variable_get(:@original_values).to_h
      @params = HashWithIndifferentAccess.new(safe_params)
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
      return if Rails.cache.exist?(['developer', params[:id], 'organizations'])
      FetchDeveloperOrgsJob.enqueue(
        params[:id], current_user.try(:access_token)
      )
    end

    def fetch_languages
      return if Rails.cache.exist?(['developer', params[:id], 'languages'])
      FetchDeveloperLanguagesJob.enqueue(
        params[:id], current_user.try(:access_token)
      )
    end
  end
end
