module SetSearchParams
  extend ActiveSupport::Concern

  private

  def format_search_params
    FormatSearchParams.new(search_params)
  end

  def search_params
    params.permit(:fullname, :location, :language, :hireable, :page)
  end
end
