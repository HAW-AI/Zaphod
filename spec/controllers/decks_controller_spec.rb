require 'spec_helper'

describe DecksController do
  let(:user) { FactoryGirl.create(:user) }
  let(:deck_attr) { deck.attributes.slice(*Deck.accessible_attributes) }
  let(:params) do
    {
      deck: deck_attr,
      auth_token: deck.user.authentication_token,
      user_id: user.id
    }
  end

  describe :create do
    let(:deck) { FactoryGirl.build(:deck, user: user) }

    context "as an authenticated user" do
      context "with valid data" do
        before { json_create params }

        specify { response.should be_success }
        it { expect { json_create params }.to change(Deck, :count).by(1) }
      end

      context "with invalid data" do
        it { expect { json_create params.except(:user_id) }.to raise_exception }

        it do
          json_create params.merge(deck: deck_attr.except('title'))
          response.should_not be_success
        end
      end
    end

    context "as an unauthenticated user" do
      before { json_create params.except(:auth_token) }

      specify { response.should_not be_success }
      it { expect { json_create params.except(:auth_token) }.not_to change(Card, :count) }
    end
  end

  describe :update do
    let(:deck) { FactoryGirl.create(:deck, user: user) }

    before { json_update params.merge(format: :json, id: deck.id, user_id: deck.user.id) }

    specify { response.should be_success }
  end
end
