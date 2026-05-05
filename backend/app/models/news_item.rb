class NewsItem < ApplicationRecord
  validates :title, presence: true

  CATEGORIES = %w[press blog litigation legislation].freeze
  validates :category, inclusion: { in: CATEGORIES }, allow_blank: true
end

