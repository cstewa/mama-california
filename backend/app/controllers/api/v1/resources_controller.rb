module Api
  module V1
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
  end
end
