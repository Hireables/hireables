class DeveloperUpdateResolver
  attr_reader :params, :record

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_developer].present?
    @params = inputs.to_h
    @developer = Schema.object_from_id(params[:id], ctx)
  end

  def call
    developer.update!(valid_params)
    { developer: developer.reload }
  end

  private

  def valid_params
    params.instance_variable_get(
      :@argument_values
    ).select do |k, _|
      developer.respond_to? "#{k}="
    end.except('id')
  end
end
