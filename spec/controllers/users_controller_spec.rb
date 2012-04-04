require 'spec_helper'

describe UsersController do
  describe :create do
    def do_post(data={})
      post :create, data.merge(format: :json)
    end
    
    context "given valid data" do
      let(:user) { FactoryGirl.attributes_for(:user).extract!(:username, :email, :password) }
      before :each do do_post :user => user end

      it { response.should be_success }
    end
  end
end
