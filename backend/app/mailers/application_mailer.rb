class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_FROM", "noreply@mamacalifornia.org")
  layout "mailer"
end
