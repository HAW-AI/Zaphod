module LoginMacros
  def login_user
    before (:each) do
      login_user FactoryGirl.create(:user)
    end
  end
end