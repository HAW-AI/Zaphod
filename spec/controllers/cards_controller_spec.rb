require 'spec_helper'

describe CardsController do
  let(:deck) { FactoryGirl.create(:deck) }
  let(:card_attr) { card.attributes.slice(*Card.accessible_attributes.to_a) }
  let(:params) do
    {
      card: card_attr,
      auth_token: card.user.authentication_token,
      deck_id: deck.id,
      format: :json
    }
  end

  describe :create do
    let(:card) { FactoryGirl.build(:card, deck: deck) }

    context "with valid data" do
      before { do_create params }

      specify { response.should be_success }
      it { expect { do_create params }.to change(Card, :count).by(1) }
    end

    context "with invalid data" do
      it { expect { do_create params.except(:deck_id) }.to raise_exception }

      it do do_create params.merge(card: card_attr.except('front'))
        response.should_not be_success
      end
    end
  end

  describe :update do
    let(:card) { FactoryGirl.create(:card, deck: deck) }

    before { do_update params.merge(format: :json, id: card.id, deck_id: card.deck.id) }

    specify { response.should be_success }
  end
end
