require 'spec_helper'

describe CollaboratorsController do
  let(:user) { FactoryGirl.create(:user) }
  let(:deck) { FactoryGirl.create(:deck) }
  let(:params) do
    {
      auth_token: user.authentication_token,
      deck_id: deck.id
    }
  end

  describe :index do
    context "as an authenticated user" do
      context "should be able to get the deck's list of editors" do
        before do
          deck.add_editor(FactoryGirl.create(:editor).id)
          json_get_index params.merge(role: "editor")
        end

        specify { response.should be_success }
        specify { JSON.parse(response.body).should_not be_empty }

        specify "without a specified role it returns all collaborators" do
          json_get_index params
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

  describe :create do

    let(:collab_attr) do
      {
        user_id: user.id,
        role: "editor"
      }
    end

    context "as an authenticated user" do
      context "with valid data" do
        it "should add a new collab" do
          expect do
            json_create params.merge(collaborator: collab_attr)
          end.to change(deck.collaborators, :count).by(1)
        end
      end

      context "with invalid data" do
        it "should do nothing" do
          expect do
            json_create params.merge(collaborator: collab_attr.merge(role: "foo"))
          end.not_to change(deck.collaborators, :count)

          expect do
            json_create params.merge(collaborator: collab_attr.except(:user_id))
          end.not_to change(deck.collaborators, :count)
        end
      end
    end

    context "as an unauthenticated user" do
      it "should do nothing" do
        expect do
          json_create params.except(:auth_token).merge(collaborator: collab_attr)
        end.not_to change(deck.collaborators, :count)
      end
    end
  end

  describe :destroy do
    context "as an authenticated user" do
      context "should be able to remove a user from the deck's list of editors" do
        before do
          editor = FactoryGirl.create(:editor)
          deck.add_editor(editor.id)
          json_destroy params.merge(role: "editor", user_ids: [editor.id])
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
    context "as an authenticated user" do
      context "should be able to add a user to the deck's list of editors" do
        before do
          editor1 = FactoryGirl.create(:editor)
          editor2 = FactoryGirl.create(:editor)
          json_update params.merge(role: "editor", user_ids: [editor1.id, editor2.id])
        end

        specify { response.should be_success }
      end

      context "should be able to add a user to the deck's list of viewers" do
        pending
      end
    end
  end
end
