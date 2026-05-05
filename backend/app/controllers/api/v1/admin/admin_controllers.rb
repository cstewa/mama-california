module Api
  module V1
    module Admin
      class BaseController < ApplicationController
        before_action :authenticate_admin!
      end

      class EventsController < BaseController
        def index
          render json: Event.order(starts_at: :desc)
        end

        def show
          render json: Event.find(params[:id])
        end

        def create
          event = Event.new(event_params)
          if event.save
            render json: event, status: :created
          else
            render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          event = Event.find(params[:id])
          if event.update(event_params)
            render json: event
          else
            render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          Event.find(params[:id]).destroy
          head :no_content
        end

        private

        def event_params
          params.permit(:title, :description, :event_type, :starts_at, :ends_at,
                        :location_name, :address, :city, :state, :zip_code,
                        :is_virtual, :virtual_link, :mobilize_url, :rsvp_url,
                        :published, :capacity)
        end
      end

      class NewsController < BaseController
        def index
          render json: NewsItem.order(created_at: :desc)
        end

        def show
          render json: NewsItem.find(params[:id])
        end

        def create
          item = NewsItem.new(news_params)
          if item.save
            render json: item, status: :created
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          item = NewsItem.find(params[:id])
          if item.update(news_params)
            render json: item
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          NewsItem.find(params[:id]).destroy
          head :no_content
        end

        private

        def news_params
          params.permit(:title, :summary, :source_name, :source_url, :category, :published_date, :featured, :published)
        end
      end

      class ResourcesController < BaseController
        def index
          render json: Resource.order(created_at: :desc)
        end

        def show
          render json: Resource.find(params[:id])
        end

        def create
          resource = Resource.new(resource_params)
          if resource.save
            render json: resource, status: :created
          else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          resource = Resource.find(params[:id])
          if resource.update(resource_params)
            render json: resource
          else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          Resource.find(params[:id]).destroy
          head :no_content
        end

        private

        def resource_params
          params.permit(:title, :description, :resource_type, :url, :author, :source, :topic, :featured, :published, :published_date)
        end
      end

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

      class SpeakersController < BaseController
        def index
          render json: Speaker.order(:name)
        end

        def show
          render json: Speaker.find(params[:id])
        end

        def create
          speaker = Speaker.new(speaker_params)
          if speaker.save
            render json: speaker, status: :created
          else
            render json: { errors: speaker.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          speaker = Speaker.find(params[:id])
          if speaker.update(speaker_params)
            render json: speaker
          else
            render json: { errors: speaker.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          Speaker.find(params[:id]).destroy
          head :no_content
        end

        private

        def speaker_params
          params.permit(:name, :title, :organization, :bio, :topic, :contact_email, :contact_url, :status, :notes)
        end
      end
    end
  end
end
