class RenamePlatformsToLanguages < ActiveRecord::Migration[5.0]
  def change
    rename_column :developers, :platforms, :languages
  end
end
