class Achievement < ApplicationRecord
  belongs_to :developer
  validates_presence_of :title, :description, :link, :date, :source, :category
  validates_uniqueness_of :source, scope: [:category, :developer_id, :title]
end
