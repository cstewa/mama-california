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

ActiveRecord::Schema[7.2].define(version: 2026_01_01_000001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chapters", force: :cascade do |t|
    t.string "name", null: false
    t.string "city"
    t.string "district"
    t.string "county"
    t.string "contact_email"
    t.string "contact_name"
    t.text "description"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contact_submissions", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "interest_type"
    t.string "city"
    t.text "message"
    t.boolean "processed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "event_type"
    t.datetime "starts_at", null: false
    t.datetime "ends_at"
    t.string "location_name"
    t.string "address"
    t.string "city"
    t.string "state", default: "CA"
    t.string "zip_code"
    t.boolean "is_virtual", default: false
    t.string "virtual_link"
    t.string "mobilize_url"
    t.string "rsvp_url"
    t.boolean "published", default: false
    t.integer "capacity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "members", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.string "phone"
    t.string "city"
    t.string "zip_code"
    t.string "district"
    t.boolean "is_admin", default: false
    t.boolean "newsletter", default: true
    t.string "status", default: "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_members_on_email", unique: true
  end

  create_table "news_items", force: :cascade do |t|
    t.string "title", null: false
    t.text "summary"
    t.string "source_name"
    t.string "source_url"
    t.string "category"
    t.date "published_date"
    t.boolean "featured", default: false
    t.boolean "published", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "resources", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "resource_type"
    t.string "url"
    t.string "author"
    t.string "source"
    t.string "topic"
    t.boolean "featured", default: false
    t.boolean "published", default: true
    t.date "published_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "speakers", force: :cascade do |t|
    t.string "name", null: false
    t.string "title"
    t.string "organization"
    t.text "bio"
    t.string "topic"
    t.string "contact_email"
    t.string "contact_url"
    t.string "status"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
