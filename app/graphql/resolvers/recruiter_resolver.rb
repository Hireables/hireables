class RecruiterResolver
  attr_reader :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, _ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_user].present?
    @params = HashWithIndifferentAccess.new(
      args.instance_variable_get(:@original_values).to_h
    )
  end

  def call
    Recruiter.find_by_login(params[:id])
  end
end
