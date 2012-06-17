class CurrentUsersController < ResourceController
  before_filter :require_login, except: [:create]
  actions :show
  defaults :resource_class => User, :instance_name => 'user'

  def show
    @user = current_user
    show!
  end

  def create
    @user = User.authenticate(params[:email], params[:password])
    respond_to do |format|
      if @user
        data = @user.as_json.merge({ authentication_token: @user.authentication_token })
        format.json { render json: data }
      else
        format.json { render json: nil, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = current_user
    @user.reset_authentication_token
    logout

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
