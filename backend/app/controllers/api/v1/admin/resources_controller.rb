module API
  module V1
    module Admin
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
    end
  end
end
