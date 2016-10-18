Rails.application.routes.draw do
  authenticated :developer do
    root 'developers#index', as: :developer_root
  end

  authenticated :recruiter do
    root 'search#index', as: :recruiter_root
  end

  root to: 'pages#index'

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

  resources :developers, except: [:create, :update]
  resources :search, only: :index
end
