require 'spec_helper'

describe User do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  
  context "given a valid user" do
    subject { Factory.create(:user) }
    
    it { should be_valid }
  end
end
