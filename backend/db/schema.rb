# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_10_200010) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "categories", id: :serial, force: :cascade do |t|
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.text "description"
    t.string "name", limit: 100, null: false

    t.unique_constraint ["name"], name: "categories_name_key"
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "brand", limit: 100
    t.integer "category_id"
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
    t.string "currency", limit: 3, default: "THB"
    t.text "description"
    t.string "image_alt", limit: 255
    t.string "image_url", limit: 500
    t.string "name", limit: 255, null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.integer "stock", default: 0
    t.datetime "updated_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "products", "categories", name: "products_category_id_fkey"
end
