require 'spec_helper'

describe CardsController do
  describe :create do
    def do_post(data = {})
      puts "data: " + data.to_s
      post :create, data.merge(format: :json)
    end

    context "as an authenticated user" do
      context "with valid data" do
        let(:data) do
          # create dependent db entries (deck and user)
          card = FactoryGirl.build(:card)

          data = FactoryGirl.attributes_for(:card)
          data[:auth_token] = FactoryGirl.attributes_for(:user)[:authentication_token]
          data[:deck] = card.deck.id
          data[:user] = card.deck.user_id
          data
        end

        before { do_post data }

        specify do
          puts "!!!"
          puts response.message
          puts response.body
          true
        end

        specify { response.should be_success }

        it "should create a db record" do
          expect { do_post data }.to change(User, :count).by(1)
        end
      end
    end
  end
end
