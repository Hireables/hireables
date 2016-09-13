module SetupRequestParams
  extend ActiveSupport::Concern

  included do
    before_action :request_params
  end

  # Setup request param
  def request_params
    Github::Params.new(developer_params).set
  end

  private

  # Whitelist the params for our controller
  def developer_params
    params.permit(:q, :page)
  end
end
