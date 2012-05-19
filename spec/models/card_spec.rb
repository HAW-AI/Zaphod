require 'spec_helper'

describe Card do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should belong_to(:deck) }
  it { should have_many(:scores) }
  it { should allow_mass_assignment_of :front }
  it { should allow_mass_assignment_of :back }
  it { should validate_presence_of :front }
  it { should validate_presence_of :deck }

  it "should belong to a saved deck" do
    should validate_presence_of :deck_id 
  end

  context "fresh out of the factory" do
    subject { FactoryGirl.create(:card) }

    it { should be_valid }
  end
end
