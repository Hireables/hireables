class AddCategoryToImports < ActiveRecord::Migration[5.0]
  def change
    remove_index :imports, [:source_name, :source_id, :connection_id]
    add_column :imports, :category, :string
    add_index :imports, :category
    add_index :imports,
    [:source_name, :source_id, :connection_id, :category],
    name: 'unique_import_per_category_and_source',
    unique: true
  end
end
