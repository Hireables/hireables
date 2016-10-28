class RecruiterResolver
  attr_reader :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, _ctx)
    @params = HashWithIndifferentAccess.new(
      args.instance_variable_get(:@original_values).to_h
    )
  end

  def call
    Recruiter.find_by_login(params[:id])
  end
end
