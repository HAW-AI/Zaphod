require 'spec_helper'

describe UsersController do
  describe :create do
    def do_post(data={})
      post :create, data.merge(format: :json)
    end
    
    context "with valid data" do
      let(:user) { FactoryGirl.attributes_for(:user).extract!(:username, :email, :password) }
      let!(:num_users) { User.count }

      before :each do do_post user: user end

      it { response.should be_success }

      it "creates a new db record" do
        User.count.should == num_users + 1
      end
    end
    
    context "with existing user data" do
      let(:user) { FactoryGirl.create(:user).attributes.extract!(:username, :email, :password) }
      before :each do do_post :user => user end

      it { response.should_not be_success }
    end
  end
end
