# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160912161658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "developers", force: :cascade do |t|
    t.string   "first_name",         default: "",    null: false
    t.string   "last_name",          default: "",    null: false
    t.string   "email",              default: "",    null: false
    t.boolean  "remote",             default: false
    t.boolean  "relocate",           default: false
    t.boolean  "available",          default: false
    t.string   "jobs",               default: [],    null: false, array: true
    t.string   "platforms",          default: [],    null: false, array: true
    t.string   "city",               default: "",    null: false
    t.string   "encrypted_password", default: "",    null: false
    t.jsonb    "data",               default: {},    null: false
    t.integer  "sign_in_count",      default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  add_index "developers", ["available"], name: "index_developers_on_available", using: :btree
  add_index "developers", ["city"], name: "index_developers_on_city", using: :btree
  add_index "developers", ["data"], name: "index_developers_on_data", using: :gin
  add_index "developers", ["email"], name: "index_developers_on_email", unique: true, using: :btree
  add_index "developers", ["jobs"], name: "index_developers_on_jobs", using: :gin
  add_index "developers", ["platforms"], name: "index_developers_on_platforms", using: :gin
  add_index "developers", ["relocate"], name: "index_developers_on_relocate", using: :btree
  add_index "developers", ["remote"], name: "index_developers_on_remote", using: :btree

end
