class RecruiterUpdateResolver
  attr_reader :params, :recruiter, :ctx

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    @params = inputs
    @ctx = ctx
    @recruiter = Schema.object_from_id(params['id'], ctx)
    authenticate_recruiter!
  end

  def call
    if valid_params[:password].nil?
      recruiter.update_without_password(valid_params.except('password'))
    else
      recruiter.update!(valid_params)
    end

    { recruiter: recruiter.reload }
  end

  private

  def authenticate_recruiter!
    raise StandardError,
          'You are not logged in' unless ctx[:current_recruiter].present?
    raise StandardError,
          'Unauthorised' unless recruiter == ctx[:current_recruiter]
    raise StandardError,
          'Wrong password' unless recruiter.valid_password?(
            params['current_password']
          )
  end

  def valid_params
    HashWithIndifferentAccess.new(
      params.instance_variable_get(
        :@original_values
      ).select do |k, _|
        recruiter.respond_to? "#{k}="
      end
    ).except(:id, :current_password).to_h
  end
end
