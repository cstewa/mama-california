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

  # Generate a fresh one-time reset token; returns the raw token.
  def generate_reset_token!
    raw = SecureRandom.urlsafe_base64(32)
    update!(
      reset_password_token: raw,
      reset_password_token_expires_at: 1.hour.from_now
    )
    raw
  end

  def reset_token_valid?(token)
    return false if reset_password_token.blank? || reset_password_token_expires_at.blank?
    return false if reset_password_token_expires_at < Time.current
    ActiveSupport::SecurityUtils.secure_compare(reset_password_token, token)
  end

  def clear_reset_token!
    update!(reset_password_token: nil, reset_password_token_expires_at: nil)
  end
end

