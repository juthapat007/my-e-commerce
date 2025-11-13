class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @users = User.find(params[:id])
    render json: @users.as_json()
  end
end
