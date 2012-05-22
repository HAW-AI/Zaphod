require 'spec_helper'

describe UsersController do
  describe :create do
    context "with valid data" do
      let(:user) { FactoryGirl.attributes_for(:user).extract!(:username, :email, :password) }
      let!(:num_users) { User.count }

      before :each do
        json_create user: user
      end

      it { response.should be_success }

      it "creates a new db record" do
        User.count.should == num_users + 1
      end
    end

    context "with existing user data" do
      let(:user) { FactoryGirl.create(:user).attributes.extract!(:username, :email, :password) }
      before :each do
        json_create user: user
      end

      it { response.should_not be_success }
    end
  end
end
