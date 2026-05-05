class Resource < ApplicationRecord
  validates :title, presence: true

  TYPES = %w[study article video guide book stat].freeze
  TOPICS = %w[addiction legislation mental_health parenting litigation ai_safety].freeze

  validates :resource_type, inclusion: { in: TYPES }, allow_blank: true
  validates :topic, inclusion: { in: TOPICS }, allow_blank: true
end

