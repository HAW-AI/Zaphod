require 'spec_helper'

describe CurrentUsersController do
  context "GET show" do
    context "should successfully login with valid user" do
      before :each do
        get :show
      end
    
      it { should_not respond_with 404 }
    end
  end
end
