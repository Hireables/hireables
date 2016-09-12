Rails.application.routes.draw do

  devise_for :users
  root to: 'pages#home'

  resources :members, only: [:index, :show] do
    collection do
      post :search
    end
  end

end
