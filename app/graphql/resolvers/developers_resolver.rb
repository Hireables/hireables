class DevelopersResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, _ctx)
    @params = HashWithIndifferentAccess.new(
      args.instance_variable_get(:@original_values).to_h
    )
  end

  def call
    query = Rails.cache.read("search/recruiter/#{current_recruiter.id}")
    api.fetch_developers(query)
  end

  private

  def api
    Github::Api.new
  end
end
