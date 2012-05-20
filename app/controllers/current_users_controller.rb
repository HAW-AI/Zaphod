class CurrentUsersController < Devise::SessionsController
  def show
    respond_with :code => :success
  end

  def create
    resource = warden.authenticate!(:scope => resource_name)
    sign_in(resource_name, resource)

    respond_with current_user.to_json
  end
end
