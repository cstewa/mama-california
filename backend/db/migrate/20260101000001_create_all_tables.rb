class CreateAllTables < ActiveRecord::Migration[7.1]
  def change
    # Members / users
    create_table :members do |t|
      t.string  :first_name,    null: false
      t.string  :last_name,     null: false
      t.string  :email,         null: false, index: { unique: true }
      t.string  :password_digest
      t.string  :phone
      t.string  :city
      t.string  :zip_code
      t.string  :district
      t.boolean :is_admin,      default: false
      t.boolean :newsletter,    default: true
      t.string  :status,        default: "active"  # active, inactive
      t.timestamps
    end

    # Events (tabling, screenings, speaker events, etc.)
    create_table :events do |t|
      t.string   :title,        null: false
      t.text     :description
      t.string   :event_type    # speaker, tabling, screening, rally, workshop
      t.datetime :starts_at,    null: false
      t.datetime :ends_at
      t.string   :location_name
      t.string   :address
      t.string   :city
      t.string   :state,        default: "CA"
      t.string   :zip_code
      t.boolean  :is_virtual,   default: false
      t.string   :virtual_link
      t.string   :mobilize_url
      t.string   :rsvp_url
      t.boolean  :published,    default: false
      t.integer  :capacity
      t.timestamps
    end

    # News / press coverage
    create_table :news_items do |t|
      t.string  :title,         null: false
      t.text    :summary
      t.string  :source_name
      t.string  :source_url
      t.string  :category       # press, blog, litigation, legislation
      t.date    :published_date
      t.boolean :featured,      default: false
      t.boolean :published,     default: false
      t.timestamps
    end

    # Resources (studies, articles, videos, parent guides)
    create_table :resources do |t|
      t.string  :title,         null: false
      t.text    :description
      t.string  :resource_type  # study, article, video, guide, book, stat
      t.string  :url
      t.string  :author
      t.string  :source
      t.string  :topic          # addiction, legislation, mental_health, parenting, litigation
      t.boolean :featured,      default: false
      t.boolean :published,     default: true
      t.date    :published_date
      t.timestamps
    end

    # Local chapters
    create_table :chapters do |t|
      t.string  :name,          null: false
      t.string  :city
      t.string  :district
      t.string  :county
      t.string  :contact_email
      t.string  :contact_name
      t.text    :description
      t.boolean :active,        default: true
      t.timestamps
    end

    # Speaker ideas / vetted speakers
    create_table :speakers do |t|
      t.string  :name,          null: false
      t.string  :title
      t.string  :organization
      t.text    :bio
      t.string  :topic
      t.string  :contact_email
      t.string  :contact_url
      t.string  :status         # suggested, contacted, confirmed, declined
      t.text    :notes
      t.timestamps
    end

    # Contact / interest form submissions
    create_table :contact_submissions do |t|
      t.string  :name
      t.string  :email
      t.string  :interest_type  # volunteer, chapter_leader, speaker, media, other
      t.string  :city
      t.text    :message
      t.boolean :processed,     default: false
      t.timestamps
    end
  end
end
