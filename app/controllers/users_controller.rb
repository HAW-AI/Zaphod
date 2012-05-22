class UsersController < ResourceController
  before_filter :require_login, except: :create
  actions :create
end
