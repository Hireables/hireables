class CreateAchievements < ActiveRecord::Migration[5.0]
  def change
    create_table :achievements do |t|
      t.string :source_id
      t.jsonb :data
      t.references :developer, foreign_key: true
      t.timestamps
    end

    add_index :achievements, [:source_id, :developer_id], unique: true
    add_index :achievements, :data, using: :gin
  end
end
