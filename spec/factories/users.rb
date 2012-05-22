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

FactoryGirl.define do
  factory :editor, class: User do
    sequence(:username) { |n| "#{n}EDITOR" }
    sequence(:email) { |n| "editor.#{n}@example.com" }
    password "editor man"
    password_confirmation "editor man"
    salt "edit"
    sequence(:authentication_token) { |n| "valid_editor_auth_token#{n}" }
  end
end
