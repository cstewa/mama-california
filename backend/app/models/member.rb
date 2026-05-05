class Member < ApplicationRecord
  has_secure_password

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, presence: true
  validates :last_name, presence: true

  before_save { self.email = email.downcase }

  def full_name
    "#{first_name} #{last_name}"
  end
end

