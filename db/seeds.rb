# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


if Rails.env == "development"
  FactoryGirl.create :card

  c = Card.new
  c.user_id = 2
  c.deck_id = 1
  c.front = 'super cool front side'
  c.back = 'not so cool back side'
  c.save!
end
