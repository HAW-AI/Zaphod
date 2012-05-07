Zaphod::Application.routes.draw do
  root to: "index#index"

  resources :users
  resources :decks, shallow: true do
    resources :cards do
      collection do
        get 'next'
      end
    end
  end

  resource :current_users, path: "current_user", as: "current_user"

  devise_for :users
end
