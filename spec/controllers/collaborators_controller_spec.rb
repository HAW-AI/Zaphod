require 'spec_helper'

describe CollaboratorsController do
  let(:user) { FactoryGirl.create(:user) }
  let(:params) do
    {
      auth_token: user.authentication_token,
    }
  end

  describe :index do
    let(:deck) { FactoryGirl.create(:deck) }

    context "as an authenticated user" do
      context "should be able to get the deck's list of editors" do
        before do
          deck.add_editor(FactoryGirl.create(:editor).id)
          json_get_index params.merge(deck_id: deck.id, role: "editor")
        end

        specify { response.should be_success }
        specify { JSON.parse(response.body).should_not be_empty }

        specify "without a specified role it returns all collaborators" do
          json_get_index params.merge(deck_id: deck.id)
          JSON.parse(response.body).should_not be_empty
        end
      end

      context "should be able to get the deck's list of viewers" do
        pending
        #before { json_get_index params.merge(deck_id: deck.id, role: "viewer") }

        #specify { response.should be_success }
        #specify { JSON.parse(response.body).should_not be_empty }
      end
    end
  end

  describe :destroy do
    let(:deck) { FactoryGirl.create(:deck) }

    context "as an authenticated user" do
      context "should be able to remove a user from the deck's list of editors" do
        before do
          editor = FactoryGirl.create(:editor)
          deck.add_editor(editor.id)
          json_destroy params.merge(deck_id: deck.id, role: "editor", user_ids: [editor.id])
        end

        specify { response.should be_success }
        specify do
          deck.reload
          deck.editors.size.should == 0
        end
      end

      context "should be able to remove a user from the deck's list of viewers" do
        pending
      end
    end
  end

  describe :update do
    let(:deck) { FactoryGirl.create(:deck) }

    context "as an authenticated user" do
      context "should be able to add a user to the deck's list of editors" do
        before do
          editor1 = FactoryGirl.create(:editor)
          editor2 = FactoryGirl.create(:editor)
          json_update params.merge(deck_id: deck.id, role: "editor", user_ids: [editor1.id, editor2.id])
        end

        specify { response.should be_success }
      end

      context "should be able to add a user to the deck's list of viewers" do
        pending
      end
    end
  end
end
