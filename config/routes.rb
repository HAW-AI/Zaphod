Zaphod::Application.routes.draw do
  class DefaultFormatMatcher
    def matches?(request)
      # jasminerice adds /jasmine route for js testing
      if Rails.env.development? && request.path_parameters[:path] == 'jasmine'
        return false
      end

      # only match html format
      request.path_parameters[:format].nil?
    end
  end

  root to: "index#index"
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
