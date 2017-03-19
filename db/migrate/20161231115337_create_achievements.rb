class CreateAchievements < ActiveRecord::Migration[5.0]
  def change
    remove_index :imports, name: 'achievements', column: :pinned

    create_table :achievements do |t|
      t.string :title
      t.text :description
      t.datetime :date
      t.string :category
      t.string :source_name
      t.string :source_id
      t.string :link
      t.jsonb :data
      t.references :import, foreign_key: true
      t.references :developer, foreign_key: true

      t.timestamps
    end

    add_index :achievements, :category
    add_index :achievements, :source_name
    add_index :achievements, :source_id
    add_index :achievements, [:source_name, :source_id, :developer_id], name: 'developer_achievements', unique: true
    add_index :achievements, [:developer_id, :date], name: 'developer_achievements_by_date'
    add_index :achievements, :data, using: :gin
  end
end
