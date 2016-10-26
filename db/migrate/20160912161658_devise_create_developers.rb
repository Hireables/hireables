class DeviseCreateDevelopers < ActiveRecord::Migration
  def change
    enable_extension 'citext'
    create_table :developers do |t|
      ## Database authenticatable
      t.string :login, null: false, default: ""
      t.string :provider, null: false, default: ""
      t.bigint :uid, null: false, default: 0

      # About
      t.string :avatar, default: ""
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.text :bio
      t.string :linkedin, default: ""
      t.string :platforms, default: "{}", array: true
      t.string :location, default: "", index: true

      # Preferences
      t.boolean :remote, default: false, index: true
      t.boolean :relocate, default: false, index: true
      t.boolean :hireable, default: false, index: true
      t.boolean :premium, default: false, index: true

      # Job types
      t.boolean :part_time, default: false, index: true
      t.boolean :full_time, default: false, index: true
      t.boolean :contract, default: false, index: true
      t.boolean :freelance, default: false, index: true
      t.boolean :internship, default: false, index: true
      t.boolean :startup, default: false, index: true

      # Level
      t.boolean :cto, default: false, index: true
      t.boolean :lead, default: false, index: true
      t.boolean :senior, default: false, index: true
      t.boolean :mid, default: false, index: true
      t.boolean :junior, default: false, index: true
      t.boolean :student, default: false, index: true

      # Api
      t.string :access_token, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      # Raw json data
      t.jsonb :data, null: false, default: "{}"

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :developers, :email, unique: true
    add_index :developers, :uid, unique: true
    add_index :developers, :login, unique: true
    add_index :developers, :data, using: :gin
    add_index :developers, :platforms, using: :gin
  end
end
