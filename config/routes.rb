Rails.application.routes.draw do

  root to: 'pages#home'

  resources :members, only: :index do
    collection do
      get :popular
      get :search
    end
  end

end
