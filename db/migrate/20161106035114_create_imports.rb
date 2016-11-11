class CreateImports < ActiveRecord::Migration[5.0]
  def change
    create_table :imports do |t|
      t.string :source_id
      t.string :source_name
      t.jsonb :data
      t.boolean :pinned, default: false
      t.references :connection, foreign_key: true
      t.references :developer, foreign_key: true
      t.timestamps
    end

    add_index :imports, [:source_name, :source_id, :connection_id], unique: true
    add_index :imports, :data, using: :gin
  end
end
