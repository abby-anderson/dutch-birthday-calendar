Rails.application.routes.draw do
  
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  namespace :api do
    
    resources :contacts
    resources :important_dates
  
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
  
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  
    
  end
  
  get "/hello", to: "application#hello_world"


end
