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
      context "card content update" do
        before { json_update params.merge(id: card.id, deck_id: card.deck.id) }

        specify { response.should be_success }
      end

      context "learning" do
        before { json_update params.merge(id: card.id, deck_id: card.deck.id, event: "known") }
        specify { response.should be_success }
        before { json_update params.merge(id: card.id, deck_id: card.deck.id, event: "unknown") }
        specify { response.should be_success }
      end
    end

    it { expect { json_update params.except(:deck_id) }.to raise_exception }
    context "with invalid data" do
      before { json_update params.merge(id: card.id, card: card_attr.merge(:front => nil)) }
      it { response.should_not be_success }
      it { response.status.should == 422 }
    end
  end

  describe :destroy do
    let(:card) { FactoryGirl.create(:card, deck: deck) }

    context "with valid data" do
      # force card creation
      before { card }

      it "deletes the card" do
        expect { delete :destroy, params.merge(format: :json, id: card.id, deck_id: card.deck.id) }.to change(Card, :count).by(-1)
      end

      specify { response.should be_success }
    end

    context "with invalid data" do
      it "doesnt find the card to delete" do
        expect { delete :destroy, params.merge(format: :json) }.to raise_exception(ActiveRecord::RecordNotFound)
      end

      # rails will respond to ActiveRecord::RecordNotFound with a 404 but not in the test env
      #specify { response.should_not be_success }
      #specify { response.status.should == 404 }
    end
  end

  describe :next do
    let(:card) { FactoryGirl.create(:card) } # dummy for line 5

    before do
      5.times { FactoryGirl.create(:card, deck: deck) }
      get :next, params.merge(id: deck.id, format: :json)
    end

    subject { ActiveSupport::JSON.decode(response.body) }

    it "should be a card in JSON format" do
      Card.accessible_attributes.to_a.select { |s| !s.empty? }.each do |k|
        subject.keys.should include k
      end
    end
  end
end
