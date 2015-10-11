module GenerateRequestUri

  extend ActiveSupport::Concern

  included do
    before_action :request_uri
  end

  private

  def request_uri
    # Construct request uri based on request
    if request_params[:page].present? and request_params[:q].present?
      "/search/users?page=#{request_params[:page]}&q=#{request_params[:q]}"
    elsif request_params[:page].present?
      "/search/users?page=#{request_params[:page]}"
    elsif request_params[:q].present?
      "/search/users?q=#{request_params[:q]}"
    else
      "/search/users?q="
    end
  end

end