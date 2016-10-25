class DevelopersResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, _ctx)
    @params = args.instance_variable_get(:@argument_values).to_h
  end

  def call
    query = Rails.cache.read('search_query')
    if params['hireable'].present? || !query[:search]
      hireables = api.fetch_hireable_developers(query)
      count = hireables.length

      while count < 51 && query[:page] < 5
        query[:page] += 1
        hireables.push(*(api.fetch_hireable_developers(query)))
        count = hireables.length
      end

      hireables.take(51)
    else
      api.fetch_developers(query)
    end
  end

  private

  def api
    Github::Api.new
  end
end
