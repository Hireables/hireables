class ToggleFavouriteResolver
  attr_reader :current_employer, :params

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, inputs, ctx)
    raise StandardError,
          'You are not logged in' unless ctx[:current_employer].present?
    @current_employer = ctx[:current_employer]
    safe_params = inputs.instance_variable_get(:@original_values).to_h
    @params = HashWithIndifferentAccess.new(safe_params)
  end

  def call
    @developer ||= fetch_developer
    raise StandardError, 'Not found' unless @developer.present?

    if current_employer.favourited?(@developer)
      current_employer.remove_from_favourites(@developer.login)
    else
      current_employer.add_to_favourites!(@developer)
    end

    { developer: @developer }
  end

  private

  def fetch_developer
    local = Developer.find_by_login(params[:login])

    if local.blank?
      api = Github::Api.new(current_employer.try(:access_token))
      api.fetch_developer(params[:login])
    else
      local
    end
  end
end
