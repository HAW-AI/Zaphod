class UsersController < ResourceController
  before_filter :authenticate_user!, :except => :create
  actions :create
end
