Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Auth
      post   "auth/login",         to: "auth#login"
      delete "auth/logout",        to: "auth#logout"
      get    "auth/me",            to: "auth#me"
      post   "auth/admin_signup",           to: "auth#admin_signup"
      post   "auth/request_password_reset", to: "auth#request_password_reset"
      post   "auth/admin_reset_password",   to: "auth#admin_reset_password"

      # Public resources
      resources :events,    only: [:index, :show]
      resources :news,      only: [:index, :show]
      resources :resources, only: [:index, :show]
      resources :chapters,  only: [:index, :show]
      resources :speakers,  only: [:index, :show]

      # Member actions
      post "members/signup",  to: "members#signup"
      post "contact",         to: "contact#create"

      # Admin (protected)
      namespace :admin do
        resources :events
        resources :news
        resources :resources
        resources :members,  only: [:index, :show, :update, :destroy]
        resources :speakers
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
  get "healthz", to: proc { [200, { "Content-Type" => "text/plain" }, ["ok"]] }

  # Serve React app for all non-API routes
  get "*path", to: "frontend#index", constraints: ->(req) { !req.path.start_with?("/api/") && !req.path.start_with?("/rails/") }
  root to: "frontend#index"
end
