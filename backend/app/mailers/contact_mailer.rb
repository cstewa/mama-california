class ContactMailer < ApplicationMailer
  def new_submission(submission)
    @submission = submission
    mail(
      to: ENV.fetch("CONTACT_RECIPIENT", "christinastewart@hey.com"),
      subject: "New MAMA California Contact: #{submission.name}"
    )
  end
end
