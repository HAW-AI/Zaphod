# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    username "Robert'); DROP TABLE Students;--"
    email "zaphod@example.com"
    password "bobby tables"
    password_confirmation "bobby tables"
    salt "tables"
  end
end
