class SearchController < ApplicationController
  before_action :authenticate_recruiter!, only: :index
  before_action :prepare_search_params!, only: :index

  def index
    SearchDevelopersWorker.perform_async
  end

  private

  def prepare_search_params!
    @search_params = PrepareSearchParams.new(
      search_params, current_recruiter, request
    )
  end

  def search_params
    params.permit(:location, :language, :hireable, :page, :repos)
  end
end
