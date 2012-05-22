class ApplicationController < ActionController::Base
  protect_from_forgery

  def not_authenticated
    redirect_to new_current_user_path, :alert => "First login to access this page."
  end
end
