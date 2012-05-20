require 'spec_helper'

describe Deck do
  it { should_not allow_mass_assignment_of :created_at }
  it { should_not allow_mass_assignment_of :updated_at }
  it { should have_many(:users) }
  it { should have_many(:collaborators) }
  it { should allow_mass_assignment_of :title }
  it { should allow_mass_assignment_of :description }
  it { should validate_presence_of :title }

  context "fresh out of the factory" do
    subject { FactoryGirl.create(:deck) }

    it { should be_valid }
  end

  it "should still be valid after setting a owner" do
    deck = FactoryGirl.create(:deck)
    deck.set_owner(FactoryGirl.create(:user).id)
    deck.should be_valid
  end

  context "add_editor should add the user to the list of deck editors" do
    it do
      deck = FactoryGirl.create(:deck)
      editor = FactoryGirl.create(:editor)
      deck.editors.should be_empty
      deck.add_editor(editor.id)
      deck.reload
      deck.editors.should include(editor)
    end
  end

  context "remove_editor should remove the user from the list of deck editors" do
    it do
      deck = FactoryGirl.create(:deck)
      editor = FactoryGirl.create(:editor)
      deck.add_editor(editor.id)
      deck.reload
      deck.remove_editor(editor.id)
      deck.editors.should be_empty
    end

  end

end
