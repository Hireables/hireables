class AddSubscribedToDevelopers < ActiveRecord::Migration
  def change
    add_column :developers, :subscribed, :boolean, default: false
    add_index :developers, :subscribed
  end
end
