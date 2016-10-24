class DeveloperUpdateResolver
  attr_reader :params, :developer

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_developer].present?
    @params = inputs
    @developer = Schema.object_from_id(params['id'], ctx)
  end

  def call
    developer.update!(valid_params.to_h)
    { developer: developer.reload }
  end

  private

  def valid_params
    HashWithIndifferentAccess.new(
      params.instance_variable_get(
        :@original_values
      ).select do |k, _|
        developer.respond_to? "#{k}="
      end
    ).except(:id)
  end
end
