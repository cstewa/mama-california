module API
  module V1
    class ChaptersController < ApplicationController
      def index
        render json: Chapter.where(active: true).order(:city)
      end

      def show
        render json: Chapter.find(params[:id])
      end
    end
  end
end
