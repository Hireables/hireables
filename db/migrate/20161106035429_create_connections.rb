class CreateAuthentications < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.bigint :uid
      t.string :provider
      t.string :access_token
      t.string :secret

      t.timestamps
    end

    add_index :connections, :uid, unique: true
    add_index :connections, :provider
  end
end
