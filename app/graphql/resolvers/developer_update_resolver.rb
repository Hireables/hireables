class DeveloperUpdateResolver
  attr_reader :params, :record, :developer

  def self.call(*args)
    new(*args).call
  end

  def initialize(inputs, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_developer].present?
    @params = inputs
    @developer = ctx[:current_developer]
    @record = Schema.object_from_id(params[:id], ctx)
  end

  def call
    record.update!(valid_params)
    { model_name.to_sym => record.reload }
  end

  private

  def valid_params
    params.instance_variable_get(
      :@argument_values
    ).select do |k, _|
      record.respond_to? "#{k}="
    end.except('id')
  end

  def model_name
    record.class.to_s.downcase
  end
end
