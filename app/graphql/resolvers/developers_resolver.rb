class DevelopersResolver
  attr_reader :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, _args, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_user].present?
    @current_user = ctx[:current_user]
  end

  def call
    query = Rails.cache.read("search/#{current_user.class.name.downcase}/#{current_user.id}")
    api = Github::Api.new(current_user.try(:access_token))
    api.fetch_developers(query)
  end
end
