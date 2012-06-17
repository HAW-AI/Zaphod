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

  context "owner should be part of the deck's users" do
    it do
      deck = FactoryGirl.create(:deck)
      deck.users.size.should == 1
      deck.users.first.should == deck.owner
    end
  end

  context "editors should be part of the deck's users" do
    it do
      deck = FactoryGirl.create(:deck)
      editor1 = FactoryGirl.create(:editor)
      editor2 = FactoryGirl.create(:editor)
      deck.add_editor(editor1.id)
      deck.add_editor(editor2.id)

      deck.users.size.should == 3
      deck.users.should include(editor1, editor2)
    end
  end


  describe :as_json do
    let(:deck) { FactoryGirl.create(:deck) }
    let(:editor) { FactoryGirl.create(:editor) }

    before do
      deck.add_editor(editor.id)
      deck.reload
    end

    after do
      deck.remove_editor(editor.id)
    end

    it "includes the collaborators" do
      deck.as_json[:collaborators].should_not be_empty
    end
  end


end
