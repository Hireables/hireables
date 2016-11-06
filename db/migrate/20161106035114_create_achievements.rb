class CreateAchievements < ActiveRecord::Migration[5.0]
  def change
    create_table :achievements do |t|
      t.string :title
      t.text :description
      t.datetime :date
      t.jsonb :meta
      t.string :source
      t.string :category
      t.references :developer, foreign_key: true

      t.timestamps
    end

    add_index :achievements,
      [:source, :category, :title, :developer_id], name: 'unique_achievement', unique: true
    add_index :achievements, :meta, using: :gin
  end
end
