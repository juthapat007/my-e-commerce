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

        # Debug logging
        Rails.logger.info "=== Creating Product ==="
        Rails.logger.info "Params: #{product_params.inspect}"
        Rails.logger.info "Product valid? #{@product.valid?}"
        Rails.logger.info "Errors: #{@product.errors.full_messages}" unless @product.valid?

        if @product.save
          render json: @product.as_json(include: :category), status: :created
        else
          # Send detailed error messages back
          render json: { 
            errors: @product.errors.full_messages,
            details: @product.errors.messages 
          }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/products/:id
      def update
        if @product.update(product_params)
          render json: @product.as_json(include: :category)
        else
          render json: { 
            errors: @product.errors.full_messages,
            details: @product.errors.messages 
          }, status: :unprocessable_entity
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


      def handle_image_upload(uploaded_file)
        # Create uploads directory if it doesn't exist
        uploads_dir = Rails.root.join('public', 'uploads')
        FileUtils.mkdir_p(uploads_dir) unless Dir.exist?(uploads_dir)

        # Generate unique filename
        timestamp = Time.now.strftime('%Y%m%d%H%M%S')
        random_string = SecureRandom.hex(4)
        file_extension = File.extname(uploaded_file.original_filename)
        filename = "product_#{timestamp}_#{random_string}#{file_extension}"

        # Save file
        file_path = uploads_dir.join(filename)
        File.open(file_path, 'wb') do |file|
          file.write(uploaded_file.read)
        end

        # Set image_url to relative path
        @product.image_url = "/uploads/#{filename}"
        @product.image_alt = @product.name if @product.image_alt.blank?

        Rails.logger.info "Image uploaded: #{filename}"
      rescue => e
        Rails.logger.error "Image upload failed: #{e.message}"
        render json: { error: "Image upload failed: #{e.message}" }, status: :unprocessable_entity
      end
    end
  end
end