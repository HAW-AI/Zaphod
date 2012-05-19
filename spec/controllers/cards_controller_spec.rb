require 'spec_helper'

describe CardsController do
  let(:deck) { FactoryGirl.create(:deck) }
  let(:card_attr) { card.attributes.slice(*Card.accessible_attributes) }
  let(:params) do
    {
      card: card_attr,
      auth_token: card.deck.users.first.authentication_token,
      deck_id: deck.id
    }
  end

  describe :create do
    let(:card) { FactoryGirl.build(:card, deck: deck) }

    context "as an authenticated user" do
      context "with valid data" do
        before { json_create params }

        specify { response.should be_success }
        it { expect { json_create params }.to change(Card, :count).by(1) }
      end

      context "with invalid data" do
        it { expect { json_create params.except(:deck_id) }.to raise_exception }

        it do
          json_create params.merge(card: card_attr.except('front'))
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
    let(:card) { FactoryGirl.create(:card, deck: deck) }

    context "with valid data" do
      before { json_update params.merge(id: card.id, deck_id: card.deck.id) }

      specify { response.should be_success }
    end

    it { expect { json_update params.except(:deck_id) }.to raise_exception }
    context "with invalid data" do
      before { json_update params.merge(id: card.id, card: card_attr.merge(:front => nil)) }
      it { response.should_not be_success }
      it { response.status.should == 422 }
    end
  end
end
