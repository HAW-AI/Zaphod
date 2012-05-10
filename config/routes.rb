Zaphod::Application.routes.draw do
  class DefaultFormatMatcher
    def matches?(request)
      # only match html format
      request.path_parameters[:format].nil?
    end
  end

  match "*path" => "index#index", constraints: DefaultFormatMatcher.new

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
