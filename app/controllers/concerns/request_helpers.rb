module RequestHelpers
  extend ActiveSupport::Concern

  private

  def query_params
    Github::Params.new(request_params).set
  end

  def github_api_uri
    Github::Uri.new(query_params, request_params[:first]).get
  end

  def cache_key
    key.get
  end

  def key_cached?
    key.cached?
  end

  def key
    CacheKey.new(request_params)
  end

  def request_params
    params.permit(
      :followers, :location, :language, :fullname, :order, :first,
      :repos, :remote, :hireable, :relocate, :full_time, :part_time
    )
  end
end
