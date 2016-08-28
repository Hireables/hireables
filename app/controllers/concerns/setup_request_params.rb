module SetupRequestParams
  extend ActiveSupport::Concern

  included do
    before_action :request_params
    before_action :set_hireable, if: :empty_params?
  end

  # Setup request param
  def request_params
    Github::Params.new(request, member_params).set
  end

  private

  def empty_params?
    member_params.empty?
  end

  def set_hireable
    params.merge!(hireable: true)
  end

  # Whitelist the params for our controller
  def member_params
    params.permit(:q, :page)
  end
end
