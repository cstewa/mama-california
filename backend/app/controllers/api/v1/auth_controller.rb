module API
  module V1
    class AuthController < ApplicationController
      def login
        member = Member.find_by(email: params[:email]&.downcase)
        if member&.authenticate(params[:password])
          render json: { token: jwt_token(member), member: member_json(member) }
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      def logout
        render json: { message: "Logged out" }
      end

      def me
        member = current_member
        if member
          render json: { member: member_json(member) }
        else
          render json: { error: "Not authenticated" }, status: :unauthorized
        end
      end

      # Step 1: user submits email; we email them a reset link if account exists.
      # We always return success to avoid leaking which emails have accounts.
      def request_password_reset
        email = params[:email]&.downcase&.strip
        member = Member.find_by(email: email) if email.present?

        if member&.is_admin?
          begin
            token = member.generate_reset_token!
            PasswordResetMailer.reset_email(member, token).deliver_now
          rescue => e
            Rails.logger.error("[PasswordReset] #{e.class}: #{e.message}\n#{e.backtrace.first(10).join("\n")}")
            render json: { error: "Could not send reset email: #{e.message}" }, status: :internal_server_error
            return
          end
        end

        render json: { message: "If an admin account exists for that email, a reset link is on its way." }
      end

      # Step 2: user submits token + new password.
      def admin_reset_password
        token = params[:token].to_s
        member = Member.where.not(reset_password_token: nil).find_by(reset_password_token: token)

        unless member && member.reset_token_valid?(token)
          render json: { error: "This reset link is invalid or has expired. Please request a new one." }, status: :unauthorized
          return
        end

        if member.update(password: params[:password])
          member.clear_reset_token!
          render json: { token: jwt_token(member), member: member_json(member) }
        else
          render json: { errors: member.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def admin_signup
        email = params[:email]&.downcase&.strip
        unless allowlisted_admin?(email)
          render json: { error: "This email is not authorized to create an admin account." }, status: :forbidden
          return
        end

        if Member.exists?(email: email)
          render json: { error: "An account with this email already exists. Please log in instead." }, status: :unprocessable_entity
          return
        end

        member = Member.new(
          email: email,
          first_name: params[:first_name],
          last_name:  params[:last_name],
          password:   params[:password],
          is_admin:   true
        )

        if member.save
          render json: { token: jwt_token(member), member: member_json(member) }, status: :created
        else
          render json: { errors: member.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      DEFAULT_ADMIN_EMAILS = %w[
        jrees41@gmail.com
        christinastewart@hey.com
        cherylwestmont@gmail.com
      ].freeze

      def allowlisted_admin?(email)
        return false if email.blank?
        env_emails = ENV.fetch("ADMIN_EMAILS", "").split(",").map { |e| e.strip.downcase }
        allowlist = (DEFAULT_ADMIN_EMAILS + env_emails).map(&:downcase).uniq
        allowlist.include?(email)
      end

      def member_json(member)
        {
          id: member.id,
          first_name: member.first_name,
          last_name: member.last_name,
          email: member.email,
          is_admin: member.is_admin,
          city: member.city
        }
      end
    end
  end
end
