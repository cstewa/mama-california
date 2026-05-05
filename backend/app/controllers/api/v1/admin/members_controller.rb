module Api
  module V1
    module Admin
      class MembersController < BaseController
        def index
          members = Member.order(created_at: :desc)
          members = members.where("city ILIKE ?", "%#{params[:city]}%") if params[:city].present?
          render json: members.select(:id, :first_name, :last_name, :email, :city, :district, :status, :newsletter, :created_at)
        end

        def show
          render json: Member.find(params[:id])
        end

        def update
          member = Member.find(params[:id])
          member.update(params.permit(:status, :is_admin, :district))
          render json: member
        end

        def destroy
          Member.find(params[:id]).destroy
          head :no_content
        end
      end
    end
  end
end
