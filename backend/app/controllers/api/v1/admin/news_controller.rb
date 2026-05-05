module API
  module V1
    module Admin
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
    end
  end
end
