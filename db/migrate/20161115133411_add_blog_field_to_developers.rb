class AddBlogFieldToDevelopers < ActiveRecord::Migration[5.0]
  def change
    add_column :developers, :blog, :string
  end
end
