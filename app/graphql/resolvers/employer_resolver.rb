class EmployerResolver
  attr_reader :params, :current_user

  def self.call(*args)
    new(*args).call
  end

  def initialize(_developer, args, ctx)
    unless ctx[:current_user].present?
      raise StandardError,
            'You are not logged in'
    end
    safe_params = args.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_params)
  end

  def call
    Employer.find_by_login(params[:id])
  end
end
