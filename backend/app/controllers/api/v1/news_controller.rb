module Api
  module V1
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
  end
end
