Rails.application.routes.draw do
  root to: 'pages#home'

  devise_for :developers,
             skip: [:sessions, :passwords, :confirmations, :registrations],
             controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  as :developer do
    delete 'developers/logout', to: 'devise/sessions#destroy',
                     as: :destroy_developer_session
    get 'developers/login', to: 'devise/sessions#new',
                 as: :new_developer_session
  end

  devise_for :recruiters

  namespace :graphql do
    post '/', to: 'query#create'
  end

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql',
                                   graphql_path: '/graphql'
  end

  resources :developers, except: :create do
    collection do
      post :search
    end
  end
end
