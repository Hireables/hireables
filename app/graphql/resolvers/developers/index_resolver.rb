module Developers
  class IndexResolver
    attr_reader :current_employer

    def self.call(*args)
      new(*args).call
    end

    def initialize(_obj, _args, ctx)
      raise StandardError, 'Unauthorised' unless ctx[:current_employer].present?
      @current_employer = ctx[:current_employer]
    end

    def call
      return [] unless Rails.cache.exist?(search_cache_key)
      query = Rails.cache.read(search_cache_key)
      api = Github::Api.new(current_employer.try(:access_token))
      api.fetch_developers(query)
    end

    private

    def search_cache_key
      "search/employer/#{current_employer.id}"
    end
  end
end
