Rails.application.routes.draw do
  root to: 'pages#home'
  resources :organizations, only: [:index, :show]
end
