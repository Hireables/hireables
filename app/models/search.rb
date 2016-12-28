class Search < ApplicationRecord
  after_commit :cleanup_old_search, on: :create
  validates_presence_of :params, :employer_id
  belongs_to :employer

  def cleanup_old_search
    Search.order(id: :desc).offset(5).destroy_all
  end
end
