module Api
  module V1
    class ContactController < ApplicationController
      def create
        submission = ContactSubmission.new(contact_params)
        if submission.save
          ContactMailer.new_submission(submission).deliver_later
          render json: { message: "Thank you! We'll be in touch soon." }, status: :created
        else
          render json: { errors: submission.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def contact_params
        params.permit(:name, :email, :interest_type, :city, :message)
      end
    end
  end
end
