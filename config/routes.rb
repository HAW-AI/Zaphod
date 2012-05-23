Zaphod::Application.routes.draw do
  class DefaultFormatGetMatcher
    def matches?(request)
      # only match GET
      return false unless request.method == 'GET'

      # jasminerice adds /jasmine route for js testing
      if Rails.env.development? && request.path_parameters[:path] == 'jasmine'
        return false
      end

      # only match html format
      request.path_parameters[:format].nil?
    end
  end

  root to: "index#index"
  match "*path" => "index#index", constraints: DefaultFormatGetMatcher.new

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
