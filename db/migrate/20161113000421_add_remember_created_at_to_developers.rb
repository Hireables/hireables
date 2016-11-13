class AddRememberCreatedAtToDevelopers < ActiveRecord::Migration[5.0]
  def change
    add_column :developers, :remember_created_at, :datetime
  end
end
