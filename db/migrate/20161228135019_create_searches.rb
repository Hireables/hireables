class CreateSearches < ActiveRecord::Migration[5.0]
  def change
    enable_extension "hstore"
    create_table :searches do |t|
      t.hstore :params
      t.references :employer, foreign_key: true
      t.timestamps
    end
    add_index :searches, :params, using: :gin
  end
end
