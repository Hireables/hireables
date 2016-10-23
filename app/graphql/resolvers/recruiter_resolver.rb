class RecruiterResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, _ctx)
    @params = args.instance_variable_get(:@argument_values).to_h
  end

  def call
    Recruiter.find_by_login(params['id'])
  end
end
