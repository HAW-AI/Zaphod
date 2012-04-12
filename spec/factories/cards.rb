# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :card do
    creator_id 1
    front "MyText"
    back "MyText"
    deck_id 1
  end
end
