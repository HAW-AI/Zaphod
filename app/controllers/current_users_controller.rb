class CurrentUsersController < ResourceController
  before_filter :require_login, except: [:create]

  def show
    respond_with current_user
  end

  def create
    @user = login(params[:email], params[:password], params[:remember_me])
    if @user
      respond_with @user
    else
      error = { error: "Authentication failed" }
      respond_with(error, status: 401, location: nil)
    end
  end

  def destroy
    logout
    respond_with(status: 200, location: nil)
  end
end
