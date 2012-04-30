# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :score do
    user_id 1
    card_id 1
    count 1
    score 1.5
  end
end
