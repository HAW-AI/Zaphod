class Score < ActiveRecord::Base
  belongs_to :user
  belongs_to :card

  validates :user, :card, :score, :count, presence: true
end
