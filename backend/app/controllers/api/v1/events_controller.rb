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
  end
end
