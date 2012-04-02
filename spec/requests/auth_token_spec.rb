require 'spec_helper'

describe "authentication_token authentication" do
  it "authenticates when given a valid auth_token"do
    user = FactoryGirl.create(:user)
    get "/current_user.json", auth_token: user.authentication_token
    response.should be_success
  end

  it "does not authenticate when given an invalid auth_token"do
    get "/current_user.json", auth_token: "foooooobar"
    response.should_not be_success
  end
end
