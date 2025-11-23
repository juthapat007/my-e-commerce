Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "users/index"
      get "users/show"
      resources :users, only: [:index, :show]
      # resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :products
      resources :categories, only: [:index, :show]
    end
  end

  # Legacy routes (if needed)
  resources :users, only: [:index]
  get "users/index"

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end