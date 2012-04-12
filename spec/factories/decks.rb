# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :deck do
    user_id 1
    title "MyString"
    description "MyText"
  end
end
