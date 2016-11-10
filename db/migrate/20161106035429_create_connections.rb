class CreateConnections < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.string :uid
      t.string :provider
      t.string :access_token
      t.datetime :expires_at, default: Time.now + 30.days
      t.references :developer, foreign_key: true

      t.timestamps
    end

    add_index :connections, [:uid, :provider], unique: true
  end
end
