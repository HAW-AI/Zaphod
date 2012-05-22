class UsersController < ResourceController
  before_filter :authenticate_user!, :except => :create

  def create
    @user = User.new(params[:user])
    if @user.save
      respond_with(@user, status: 201)
    else
      respond_with(@user.errors, location: nil)
    end
  end
end
