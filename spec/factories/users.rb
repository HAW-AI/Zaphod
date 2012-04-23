# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "Robert#{n}'); DROP TABLE Students;--" }
    sequence(:email) { |n| "zaphod.#{n}@example.com" }
    password "bobby tables"
    password_confirmation "bobby tables"
    salt "tables"
    sequence(:authentication_token) { |n| "valid_auth_token#{n}" }
  end
end
