require 'spec_helper'

describe User do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }

  context "uniqueness" do
    before { FactoryGirl.create(:user) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_uniqueness_of(:username) }
  end
  
  context "given a valid user" do
    subject { FactoryGirl.create(:user) }
    
    it { should be_valid }
  end
end
