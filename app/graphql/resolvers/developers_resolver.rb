class DevelopersResolver
  attr_reader :current_recruiter

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_recruiter].present?
    @current_recruiter = ctx[:current_recruiter]
  end

  def call
    query = Rails.cache.read("search/recruiter/#{current_recruiter.id}")
    api = Github::Api.new(current_recruiter.try(:access_token))
    api.fetch_developers(query)
  end
end
