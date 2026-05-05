module Api
  module V1
    class EventsController < ApplicationController
      def index
        events = Event.where(published: true)
                      .where("starts_at >= ?", Time.current)
                      .order(:starts_at)
        render json: events
      end

      def show
        event = Event.find_by!(id: params[:id], published: true)
        render json: event
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
      end
    end

    class NewsController < ApplicationController
      def index
        items = NewsItem.where(published: true)
                        .order(published_date: :desc, created_at: :desc)
                        .limit(params[:limit] || 20)
        render json: items
      end

      def show
        item = NewsItem.find_by!(id: params[:id], published: true)
        render json: item
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
      end
    end

    class ResourcesController < ApplicationController
      def index
        scope = Resource.where(published: true)
        scope = scope.where(topic: params[:topic]) if params[:topic].present?
        scope = scope.where(resource_type: params[:type]) if params[:type].present?
        render json: scope.order(featured: :desc, created_at: :desc)
      end

      def show
        resource = Resource.find_by!(id: params[:id], published: true)
        render json: resource
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
      end
    end

    class ChaptersController < ApplicationController
      def index
        render json: Chapter.where(active: true).order(:city)
      end

      def show
        render json: Chapter.find(params[:id])
      end
    end

    class SpeakersController < ApplicationController
      def index
        render json: Speaker.where(status: "confirmed").order(:name)
      end

      def show
        render json: Speaker.find(params[:id])
      end
    end

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
