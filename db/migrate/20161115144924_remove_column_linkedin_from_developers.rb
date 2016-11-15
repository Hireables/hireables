class RemoveColumnLinkedinFromDevelopers < ActiveRecord::Migration[5.0]
  def change
    remove_column :developers, :linkedin, :string
  end
end
