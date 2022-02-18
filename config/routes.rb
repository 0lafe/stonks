Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "homes#index"

  namespace :api do
    resources :users, only: [:index, :show]
    resources :stocks, only: [:index, :show]
    resources :companies, only: [:index, :show]
    resources :buy_orders, only: [:index, :show]
  end

  get "*path", to: "homes#index"

end
