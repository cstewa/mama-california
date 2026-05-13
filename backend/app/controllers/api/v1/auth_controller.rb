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

      def allowlisted_admin?(email)
        return false if email.blank?
        allowlist = ENV.fetch("ADMIN_EMAILS", "").split(",").map { |e| e.strip.downcase }
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
