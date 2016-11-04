class EmployerUpdateResolver
  attr_reader :params, :employer, :ctx

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    @params = inputs
    @ctx = ctx
    @employer = Schema.object_from_id(params['id'], ctx)
    authenticate_employer!
  end

  def call
    if valid_params[:password].nil?
      employer.update_without_password(valid_params.except('password'))
    else
      employer.update!(valid_params)
    end

    { employer: employer.reload }
  end

  private

  def authenticate_employer!
    raise StandardError,
          'You are not logged in' unless ctx[:current_employer].present?
    raise StandardError,
          'Unauthorised' unless employer == ctx[:current_employer]
    raise StandardError,
          'Wrong password' unless employer.valid_password?(
            params['current_password']
          )
  end

  def valid_params
    HashWithIndifferentAccess.new(
      params.instance_variable_get(
        :@original_values
      ).select do |k, _|
        employer.respond_to? "#{k}="
      end
    ).except(:id, :current_password).to_h
  end
end
