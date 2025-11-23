module Api
  module V1
    class CategoriesController < ApplicationController
      # GET /api/v1/categories
      def index
        @categories = Category.all
        render json: @categories
      end

      # GET /api/v1/categories/:id
      def show
        @category = Category.find(params[:id])
        render json: @category.as_json(include: :products) #จะดึง products ที่เกี่ยวข้องออกมาด้วย
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Category not found' }, status: :not_found
      end
    end
  end
end

