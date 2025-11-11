class TodosController < ApplicationController
      def index
    render json: { tasks: ["learn Ruby", "connect Angular"] }
  end
end
