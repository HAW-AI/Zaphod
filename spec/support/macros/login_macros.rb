module LoginMacros
  def login_user
    before (:each) do
      auto_login FactoryGirl.create(:user)
    end
  end
end
