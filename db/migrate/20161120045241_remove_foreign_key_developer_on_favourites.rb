class RemoveForeignKeyDeveloperOnFavourites < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key :favourites, column: :developer_id
  end
end
