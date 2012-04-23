require 'spec_helper'

describe CardsController do
  describe :create do
    def do_post(data = {})
      puts "do_post: data: " + data.to_s
      post :create, data.merge(format: :json)
    end

    context "as an authenticated user" do
      context "with valid data" do
        let(:data) do
          # create dependent db entries (deck and user)
          card = FactoryGirl.create(:card)
          data = {}

          data[:card] = card.attributes.except("deck_id", "id", "user_id", "created_at", "updated_at")
          data[:auth_token] = card.user.authentication_token
          data
        end

        before { do_post data }

        specify { response.should be_success }

        it "should create a db record" do
          expect { do_post data }.to change(Card, :count).by(1)
        end
      end
    end
  end
end
