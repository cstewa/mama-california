module API
  module V1
    class SpeakersController < ApplicationController
      def index
        render json: Speaker.where(status: "confirmed").order(:name)
      end

      def show
        render json: Speaker.find(params[:id])
      end
    end
  end
end
