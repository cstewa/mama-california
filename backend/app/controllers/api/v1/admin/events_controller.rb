module API
  module V1
    module Admin
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
    end
  end
end
