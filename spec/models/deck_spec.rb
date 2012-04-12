require 'spec_helper'

describe Deck do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should belong_to(:user) }
  it { should allow_mass_assignment_of :title }
  it { should allow_mass_assignment_of :description }

  context "fresh out of the factory" do
    subject { FactoryGirl.create(:deck) }

    it { should be_valid }
  end
end
