class AutocompleteResolver
  attr_reader :current_employer, :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, ctx)
    @current_employer = ctx[:current_employer]
    safe_params = args.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_params)
    raise StandardError, 'Unauthorised' unless current_employer.present?
  end

  def call
    return [] unless params[:query].present?
    Developer.where(
      'LOWER(name) LIKE :query',
      query: "%#{params[:query].downcase}%",
      hireable: true
    )
  end
end
