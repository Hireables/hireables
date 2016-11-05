class FavouritesResolver
  attr_reader :current_employer

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, _args, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_employer].present?
    @current_employer = ctx[:current_employer]
  end

  def call
    api = Github::Api.new(current_employer.try(:access_token))
    api.find_developers_by_login(current_employer.favourited_developers.members)
  end
end
