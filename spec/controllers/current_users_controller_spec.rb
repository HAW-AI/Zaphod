require 'spec_helper'

describe CurrentUsersController do
  context :create do
    let(:user) { FactoryGirl.create(:user) }
    let(:params) { { user: { email: user.email, password: user.password } } }

    context "with valid credentials" do
      before { json_create params }
      subject { response.body }
      it { should == user.to_json }
    end
  end


  context "GET show" do
    context "should successfully login with valid user" do
      before :each do
        get :show
      end

      it { should_not respond_with 404 }
    end
  end
end
