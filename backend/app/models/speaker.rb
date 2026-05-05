class Speaker < ApplicationRecord
  validates :name, presence: true

  STATUSES = %w[suggested contacted confirmed declined].freeze
  validates :status, inclusion: { in: STATUSES }, allow_blank: true
end

