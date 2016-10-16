module CacheSearchParams
  extend ActiveSupport::Concern
  included do
    before_action :cache_search_params!, only: :index
  end

  def cache_search_params!
    Rails.cache.fetch(search_cache_key, expires: 2.days) do
      {
        query: format_search_params.to_query,
        cache_key: format_search_params.to_cache_key,
        page: search_params['page'] || 1,
        access_token: current_developer.try(:access_token)
      }
    end
  end
end
