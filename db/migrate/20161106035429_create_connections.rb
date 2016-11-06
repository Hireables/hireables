class CreateConnections < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.bigint :uid
      t.string :provider
      t.string :access_token

      t.timestamps
    end

    add_index :connections, [:uid, :provider], unique: true
  end
end
