Zaphod::Application.routes.draw do
  resources :users
  resources :decks, shallow: true do
    resources :cards do
      collection do
        get 'next'
      end
    end
  end

  devise_for :users, controllers: {:sessions => :current_users}, skip: [:sessions]

  devise_scope :user do
    post "current_user" => "current_users#create"
  end

  resource :current_users, path: "current_user", as: "current_user", only: [:show]
end
