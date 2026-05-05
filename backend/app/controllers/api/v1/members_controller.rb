module API
  module V1
    class MembersController < ApplicationController
      def signup
        member = Member.new(member_params)
        if member.save
          render json: { token: jwt_token(member), member: { id: member.id, email: member.email, first_name: member.first_name } }, status: :created
        else
          render json: { errors: member.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def member_params
        params.permit(:first_name, :last_name, :email, :password, :phone, :city, :zip_code, :district, :newsletter)
      end
    end
  end
end
