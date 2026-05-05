module Api
  module V1
    module Admin
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
