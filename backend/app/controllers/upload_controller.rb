class UploadController < ApplicationController
  def create
    if params[:image].present?
      uploaded_file = params[:image]
      filename = "#{Time.now.to_i}_#{params[:file].original_filename}"
      filepath = Rails.root.join('public', 'uploads', filename)

      # save file
      File.open(filepath, 'wb') do |file|
        file.write(uploaded_file.read)
      end

      render json: { url: "/uploads/#{filename}" }, status: :ok
    else
      render json: { error: "No file uploaded" }, status: :unprocessable_entity
    end
  end
end
