Rails.application.routes.draw do
  root to: 'pages#home'

  devise_for :developers, skip: [:sessions, :passwords, :confirmations, :registrations],
                     controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  as :developer do
    delete 'logout', to: 'devise/sessions#destroy', as: :destroy_developer_session
    get 'login', to: 'devise/sessions#new', as: :new_developer_session
  end

  namespace :graphql do
    post '/', to: 'query#create'
  end

  # GraphiQL api playground
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  resources :developers, except: :create do
    collection do
      post :search
    end
  end
end
