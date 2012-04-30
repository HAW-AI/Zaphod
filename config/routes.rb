Zaphod::Application.routes.draw do
  resources :users, shallow: true do
    resources :decks do
      resources :cards do
        collection do
          get 'next'
        end
      end
    end
  end

  resource :current_users, path: "current_user", as: "current_user"

  devise_for :users
end
