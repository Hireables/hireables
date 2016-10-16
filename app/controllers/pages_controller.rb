class PagesController < ApplicationController
  include SetSearchParams
  include CacheSearchParams
  include EnqueueSearchWorker

  # GET /
  def index
  end
end
