module RequestHelpers
  extend ActiveSupport::Concern

  def github_api_uri
    Github::Uri.new(github_query_params).get
  end

  def cache_key
    CacheKey.new(request_params).key
  end

  def request_params
    safe_params.empty? ? default_params : safe_params
  end

  private

  def github_query_params
    Github::Params.new(request_params).set
  end

  def default_params
    {
      followers: '>10',
      repos: '>10'
    }
  end

  def safe_params
    params.permit(
      :first, :fullname, :location, :language, :followers, :repos,
      :hireable, :remote, :relocate, :fulltime, :parttime, :order
    )
  end
end
