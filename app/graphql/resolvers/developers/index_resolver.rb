module Developers
  class IndexResolver
    attr_reader :current_user

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, _args, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_user].present?
      @current_user = ctx[:current_user]
    end

    def call
      return [] unless Rails.cache.exist?(search_cache_key)
      query = Rails.cache.read(search_cache_key)
      api = Github::Api.new(current_user.try(:access_token))
      api.fetch_developers(query)
    end

    private

    def search_cache_key
      "search/#{current_user.class.name.downcase}/#{current_user.id}"
    end
  end
end
