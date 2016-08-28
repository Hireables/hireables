module SetupRequestParams
  extend ActiveSupport::Concern

  included do
    before_action :request_params
  end

  # Setup request param
  def request_params
    Github::Params.new(member_params).set
  end

  private

  # Whitelist the params for our controller
  def member_params
    params.permit(:q, :page)
  end
end
