class Card < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user

  attr_accessible :front, :back

  validates :front, presence: true
end
