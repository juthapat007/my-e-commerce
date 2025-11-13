module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: [:show, :update, :destroy]

      # GET /api/v1/products
      def index
        @products = Product.includes(:category).all

        # Optional filtering
        @products = @products.by_category(params[:category_id]) if params[:category_id].present?
        @products = @products.search_by_name(params[:search]) if params[:search].present?
        @products = @products.in_stock if params[:in_stock] == 'true'

        render json: @products.as_json(include: :category)
      end

      # GET /api/v1/products/:id
      def show
        render json: @product.as_json(include: :category)
      end

      # POST /api/v1/products
      def create
        @product = Product.new(product_params)

        if @product.save
          render json: @product, status: :created
        else
          render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/products/:id
      def update
        if @product.update(product_params)
          render json: @product
        else
          render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/products/:id
      def destroy
        @product.destroy
        head :no_content
      end

      private

      def set_product
        @product = Product.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Product not found' }, status: :not_found
      end

      def product_params
        params.require(:product).permit(
          :name,
          :category_id,
          :price,
          :currency,
          :stock,
          :description,
          :brand,
          :image_url,
          :image_alt
        )
      end
    end
  end
end