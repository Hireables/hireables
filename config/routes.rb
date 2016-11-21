# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  authenticated :developer do
    root 'search#index', as: :developer_root
  end

  authenticated :employer do
    root 'search#index', as: :employer_root
  end

  root to: 'pages#index'
  get '/cookies-policy', to: 'pages#cookies_policy'
  get '/privacy-policy', to: 'pages#privacy_policy'
  get '/terms-of-service', to: 'pages#terms'
  get '/upgrade-browser', to: 'pages#upgrade_browser'

  namespace :graphql do
    post '/', to: 'query#create'
  end

  devise_for :developers,
             skip: [:sessions, :passwords, :confirmations, :registrations],
             controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  as :developer do
    delete 'developers/logout', to: 'devise/sessions#destroy',
                                as: :destroy_developer_session
    get 'developers/login', to: 'devise/sessions#new',
                            as: :new_developer_session
    delete 'developers/cancel', to: 'devise/registrations#destroy',
                                as: :cancel_developer_registration
  end

  devise_for :employers

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql',
                                   graphql_path: '/graphql'
  end

  resources :search, only: :index
  resources :employers, only: [:show, :edit]

  get '/:id', to: 'developers#show', as: :developer
  get '/:id/edit', to: 'developers#edit', as: :edit_developer
end
