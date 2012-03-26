require 'spec_helper'

describe User do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }
  
  context "given a valid user" do
    subject { Factory.create(:user) }
    
    it { should be_valid }
  end
end
