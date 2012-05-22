require 'spec_helper'

describe CurrentUsersController do
  let(:user) { FactoryGirl.create(:user) }
  let(:params) do
    {
      auth_token: user.authentication_token,
      email: user.email,
      password: FactoryGirl.build(:user).password
    }
  end

  describe :get do
    context "as an authenticated user" do
      context "should successfully return the current_user" do
        before { json_get_show params }
        subject { response }

        it { should be_success }
        specify { response.body.should == user.to_json }
      end
    end

    context "as an unauthenticated user" do
      context "should not successfully return a user" do
        before { json_get_show params.except(:auth_token) }
        subject { response }

        it { should_not be_success }
        specify { response.body.should_not == user.to_json }
      end
    end
  end

  describe :create do
    context "with valid data" do
      before { json_create params.except(:auth_token) }
      subject { response }

      it { should be_success }
      specify { response.body.should == user.to_json }
    end
  end

  describe :destroy do
    context "with valid data" do
      let!(:before_auth_token) { user.authentication_token }
      before { json_destroy params }
      subject { response }

      it { should be_success }
      specify { response.body.should == " " }
      specify do
        user.reload
        user.authentication_token.should_not == before_auth_token
      end
    end
  end
end
