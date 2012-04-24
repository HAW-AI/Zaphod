require 'spec_helper'

describe CardsController do
  let(:deck) { FactoryGirl.create(:deck) }
  let(:params) do
    {
      card: card.attributes.slice(Card.accessible_attributes),
      auth_token: card.user.authentication_token
    }
  end

  describe :create do
    let(:card) { FactoryGirl.build(:card, deck: deck) }

    context "with valid data" do
      before { do_create params.merge(format: :json, deck_id: deck.id) }

      specify { response.should be_success }
      it { expect { do_create params }.to change(Card, :count).by(1) }
    end
  end

  describe :update do
    let(:card) { FactoryGirl.create(:card, deck: deck) }

    before { do_update params.merge(format: :json, id: card.id, deck_id: card.deck.id) }

    specify { response.should be_success }
  end
end
