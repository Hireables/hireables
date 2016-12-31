class CreateAchievements < ActiveRecord::Migration[5.0]
  def change
    create_table :achievements do |t|
      t.string :title
      t.text :description
      t.datetime :date
      t.string :category
      t.string :source_name
      t.string :source_id
      t.jsonb :data
      t.references :developer, foreign_key: true

      t.timestamps
    end

    add_index :achievements, :category
    add_index :achievements, :source_name
    add_index :achievements, [:source_name, :source_id, :developer_id], unique: true
    add_index :achievements, :source_id
    add_index :achievements, :data, using: :gin
  end
end
