require 'spec_helper'

describe CardsController do
  let(:deck) { FactoryGirl.create(:deck) }

  describe :create do
    let(:card) { FactoryGirl.build(:card, deck: deck) }

    def do_create(data = {})
      post :create, data.merge(format: :json, deck_id: deck.id)
    end

    context "with valid data" do
      let(:params) do
        {
          card: card.attributes.slice(Card.accessible_attributes),
          auth_token: card.user.authentication_token
        }
      end

      before { do_create params }

      specify { response.should be_success }
      it { expect { do_create params }.to change(Card, :count).by(1) }
    end
  end

  describe :update do
    let(:card) { FactoryGirl.create(:card, deck: deck) }

    def do_update(data={})
      post :update, data.merge(format: :json, id: card.id, deck_id: card.deck.id)
    end

    let(:params) do
      {
        card: card.attributes.slice(Card.accessible_attributes),
        auth_token: card.user.authentication_token
      }
    end

    before { do_update params }

    specify { response.should be_success }
  end
end
