module LoginMacros
  def login_user
    before (:each) do
      sign_in FactoryGirl.create(:user)
    end
  end
end