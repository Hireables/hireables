class AddPremiumToDevelopers < ActiveRecord::Migration
  def change
    add_column :developers, :premium, :boolean, default: false
    add_index :developers, :premium
  end
end
