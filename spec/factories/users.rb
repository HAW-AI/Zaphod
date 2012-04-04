# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    username "Robert'); DROP TABLE Students;--"
    sequence(:email) { |n| "zaphod.#{n}@example.com" }
    password "bobby tables"
    password_confirmation "bobby tables"
    salt "tables"
    authentication_token "valid_auth_token"
  end
end
