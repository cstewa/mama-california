module Api
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

      private

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
