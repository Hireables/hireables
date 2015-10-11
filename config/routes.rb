Rails.application.routes.draw do

  root to: 'pages#home'

  resources :members, only: [:index, :show] do
    collection do
      get :popular
      get :search
    end
  end

end
