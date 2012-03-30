require 'spec_helper'

describe CurrentUsersController do
  context "POST create" do
    context "should successfully login with valid user" do
      before :each do
        post :create
      end
    
      it { should_not respond_with 404 }
    end
  end
  
  context "DELETE delete" do
    it "should successfully destroy session"
  end
end
