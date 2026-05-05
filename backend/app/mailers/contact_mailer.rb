class ContactMailer < ApplicationMailer
  def new_submission(submission)
    @submission = submission
    mail(
      to: "christinastewart@hey.com",
      subject: "New MAMA California Contact: #{submission.name}"
    )
  end
end
