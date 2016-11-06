class DropAuthenticationFieldsFromDevelopers < ActiveRecord::Migration[5.0]
  def change
    remove_column :developers, :uid, :bigint, default: 0
    remove_column :developers, :provider, :stirng, default: ""
    remove_column :developers, :access_token, :stirng, default: ""
  end
end
