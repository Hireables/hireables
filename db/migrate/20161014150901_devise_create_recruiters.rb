
class DeviseCreateRecruiters < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'citext'
    create_table :recruiters do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :avatar, null: false, default: ""
      t.string :name,              null: false, default: ""
      t.boolean :verified, default: false
      t.string :company,              null: false, default: ""
      t.string :website,              null: false, default: ""
      t.jsonb :preferences, null: false, default: '{}'
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :recruiters, :email,                unique: true
    add_index :recruiters, :reset_password_token, unique: true
  end
end
