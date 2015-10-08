Rails.application.routes.draw do

  root to: 'organizations#index'

  resources :organizations, only: [:index, :show] do
    resources :members, only: :index
    collection do
      get :popular
    end
    member do
      post :search
    end
  end

end
