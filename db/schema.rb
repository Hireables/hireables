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

ActiveRecord::Schema.define(version: 20161105044438) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "citext"

  create_table "developers", force: :cascade do |t|
    t.string   "login",              default: "",    null: false
    t.string   "provider",           default: "",    null: false
    t.bigint   "uid",                default: 0,     null: false
    t.string   "avatar",             default: ""
    t.string   "name",               default: "",    null: false
    t.string   "email",              default: "",    null: false
    t.text     "bio"
    t.string   "linkedin",           default: ""
    t.string   "location",           default: ""
    t.string   "platforms",          default: [],                 array: true
    t.boolean  "remote",             default: false
    t.boolean  "relocate",           default: false
    t.boolean  "hireable",           default: false
    t.boolean  "premium",            default: false
    t.boolean  "part_time",          default: false
    t.boolean  "full_time",          default: false
    t.boolean  "contract",           default: false
    t.boolean  "freelance",          default: false
    t.boolean  "internship",         default: false
    t.boolean  "startup",            default: false
    t.boolean  "cto",                default: false
    t.boolean  "lead",               default: false
    t.boolean  "senior",             default: false
    t.boolean  "mid",                default: false
    t.boolean  "junior",             default: false
    t.boolean  "student",            default: false
    t.string   "access_token",       default: "",    null: false
    t.string   "encrypted_password", default: "",    null: false
    t.jsonb    "data",               default: "{}",  null: false
    t.integer  "sign_in_count",      default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["contract"], name: "index_developers_on_contract", using: :btree
    t.index ["cto"], name: "index_developers_on_cto", using: :btree
    t.index ["data"], name: "index_developers_on_data", using: :gin
    t.index ["email"], name: "index_developers_on_email", unique: true, using: :btree
    t.index ["freelance"], name: "index_developers_on_freelance", using: :btree
    t.index ["full_time"], name: "index_developers_on_full_time", using: :btree
    t.index ["hireable"], name: "index_developers_on_hireable", using: :btree
    t.index ["internship"], name: "index_developers_on_internship", using: :btree
    t.index ["junior"], name: "index_developers_on_junior", using: :btree
    t.index ["lead"], name: "index_developers_on_lead", using: :btree
    t.index ["location"], name: "index_developers_on_location", using: :btree
    t.index ["login"], name: "index_developers_on_login", unique: true, using: :btree
    t.index ["mid"], name: "index_developers_on_mid", using: :btree
    t.index ["part_time"], name: "index_developers_on_part_time", using: :btree
    t.index ["platforms"], name: "index_developers_on_platforms", using: :gin
    t.index ["premium"], name: "index_developers_on_premium", using: :btree
    t.index ["relocate"], name: "index_developers_on_relocate", using: :btree
    t.index ["remote"], name: "index_developers_on_remote", using: :btree
    t.index ["senior"], name: "index_developers_on_senior", using: :btree
    t.index ["startup"], name: "index_developers_on_startup", using: :btree
    t.index ["student"], name: "index_developers_on_student", using: :btree
    t.index ["uid"], name: "index_developers_on_uid", unique: true, using: :btree
  end

  create_table "employers", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "login",                  default: "",    null: false
    t.text     "bio",                    default: "",    null: false
    t.string   "avatar",                 default: "",    null: false
    t.string   "name",                   default: "",    null: false
    t.boolean  "verified",               default: false
    t.string   "company",                default: "",    null: false
    t.string   "website",                default: "",    null: false
    t.jsonb    "preferences",            default: "{}",  null: false
    t.string   "access_token",           default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.index ["email"], name: "index_employers_on_email", unique: true, using: :btree
    t.index ["login"], name: "index_employers_on_login", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_employers_on_reset_password_token", unique: true, using: :btree
  end

  create_table "favourites", force: :cascade do |t|
    t.string   "login"
    t.integer  "developer_id"
    t.integer  "employer_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["developer_id"], name: "index_favourites_on_developer_id", using: :btree
    t.index ["employer_id"], name: "index_favourites_on_employer_id", using: :btree
    t.index ["login", "developer_id", "employer_id"], name: "index_favourites_on_login_and_developer_id_and_employer_id", unique: true, using: :btree
    t.index ["login"], name: "index_favourites_on_login", using: :btree
  end

  add_foreign_key "favourites", "developers"
  add_foreign_key "favourites", "employers"
end
