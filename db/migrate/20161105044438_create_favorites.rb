class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.string :login
      t.references :employer, foreign_key: true

      t.timestamps
    end
    add_index :favorites, :login
  end
end
