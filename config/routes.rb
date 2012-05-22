Zaphod::Application.routes.draw do
  resources :users
  resources :decks, shallow: true do
    resources :cards do
      collection do
        get 'next'
      end
    end
    resources :collaborators, only: [:index] do
      collection do
        put :update
        delete :destroy
      end
    end
  end

  resource :current_users, path: "current_user", as: "current_user"
end
