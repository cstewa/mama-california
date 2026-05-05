class Event < ApplicationRecord
  validates :title, presence: true
  validates :starts_at, presence: true

  EVENT_TYPES = %w[speaker tabling screening rally workshop].freeze
  validates :event_type, inclusion: { in: EVENT_TYPES }, allow_blank: true

  scope :upcoming, -> { where("starts_at >= ?", Time.current).order(:starts_at) }
  scope :past, -> { where("starts_at < ?", Time.current).order(starts_at: :desc) }
  scope :published, -> { where(published: true) }
end

