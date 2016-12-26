class FixUniqueIndexForConnections < ActiveRecord::Migration[5.0]
  def change
    remove_index :connections, [:uid, :provider]
    add_index :connections, [:uid, :provider, :developer_id], unique: true
  end
end
