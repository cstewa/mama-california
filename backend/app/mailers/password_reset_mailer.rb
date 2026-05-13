class PasswordResetMailer < ApplicationMailer
  def reset_email(member, token)
    @member = member
    @reset_url = "#{ENV.fetch('FRONTEND_URL', 'http://localhost:5173')}/admin/reset-password/#{token}"
    mail(to: member.email, subject: "Reset your MAMA California admin password")
  end
end
