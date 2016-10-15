module CacheSearchParams
  def format_search_params
    FormatSearchParams.new(search_params)
  end

  def search_cache_key
    format_search_params.to_cache_key
  end

  def search_query
    format_search_params.to_query
  end

  def cache_search_params!
    Rails.cache.fetch(search_cache_key, expires: 2.days) do
      {
        query: search_query,
        cache_key: search_cache_key,
        page: search_params['page'] || 1,
        access_token: current_developer.try(:access_token)
      }
    end
  end
end
