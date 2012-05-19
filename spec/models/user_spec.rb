require 'spec_helper'

describe User do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }
  it { should have_many(:collaborator_decks) }
  it { should have_many(:scores) }

  context "given there exist already some other" do
    # validate_uniqueness_of requires at least one database entry
    before { FactoryGirl.create(:user) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_uniqueness_of(:username) }
  end

  context "fresh out of the factory" do
    subject { FactoryGirl.create(:user) }

    it { should be_valid }
  end
end
