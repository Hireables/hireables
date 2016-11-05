class CreateFavourites < ActiveRecord::Migration[5.0]
  def change
    create_table :favourites do |t|
      t.string :login
      t.references :developer, foreign_key: true
      t.references :employer, foreign_key: true

      t.timestamps
    end

    add_index :favourites, :login
    add_index :favourites, [:login, :developer_id, :employer_id], unique: true
  end
end
