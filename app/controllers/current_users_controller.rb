class CurrentUsersController < ResourceController
  def show
    respond_with :code => :success
  end

  def create
    user = login(params[:email], params[:password], params[:remember_me])
    if user
      #redirect_back_or_to root_url, :notice => "Logged in!"
      respond_with user
    else
      error = { error: "Authentication failed" }
      respond_with(error, status: 401, location: nil)
    end
  end

  def destroy
    logout
    redirect_to root_url, :notice => "Logged out!"
  end
end
