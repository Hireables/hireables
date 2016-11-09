class DevelopersResolver
  attr_reader :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, _args, ctx)
    unless ctx[:current_user].present?
      raise StandardError,
            'You are not logged in'
    end
    @current_user = ctx[:current_user]
  end

  def call
    query = Rails.cache.read(search_cache_key)
    api = Github::Api.new(current_user.try(:access_token))
    api.fetch_developers(query)
  end

  private

  def search_cache_key
    "search/#{current_user.class.name.downcase}/#{current_user.id}"
  end
end
