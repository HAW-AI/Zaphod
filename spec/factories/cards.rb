# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :card do
    user
    front "Supercalifragilisticexpialidocious"
    back 'is a song from the 1964 Disney musical film Mary Poppins. The song was written by the Sherman Brothers, and sung by Julie Andrews and Dick Van Dyke. It also appears in the stage show version. Since Mary Poppins was a period piece set in 1910, period-sounding songs were wanted. "Supercalifragilisticexpialidocious" sounds like contemporary music hall songs "Boiled Beef and Carrots" and "Any Old Iron".'
    deck
  end
end
