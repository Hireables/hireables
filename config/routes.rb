Rails.application.routes.draw do

  root to: 'pages#home'

  resources :organizations, only: [:index, :show] do
    resources :members, only: :index
    member do
      post :search
    end
  end

end
