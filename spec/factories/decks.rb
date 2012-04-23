# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :deck do
    user
    title "Flux capacitor"
    description "The flux capacitor, which consists of a regularly squared compartment with three flashing Geissler style-tubes (arranged in a \"Y\" configuration), is described by Doc as \"what makes time travel possible.\" The device is the core component of the time machine."
  end
end
