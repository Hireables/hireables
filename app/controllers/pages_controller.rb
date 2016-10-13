class PagesController < ApplicationController
  # GET /
  def home
    query = Github::Params.new(params).set
    SearchDevelopersWorker.perform_async(
      query,
      current_developer.try(:id)
    ) unless Rails.cache.exist?(query)
  end
end
