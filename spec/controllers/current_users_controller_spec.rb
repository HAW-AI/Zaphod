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

  context "authentication" do
    let(:user) { FactoryGirl.create(:user) }

    context "with valid token" do
      subject { sign_in_with_auth_token user.authentication_token }

      it { should_not be_nil }
    end

    context "with invalid token" do
      subject { sign_in_with_auth_token "invalid" }

      it { should be_nil }
    end
  end
end
