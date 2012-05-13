class Card < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user
  has_many :scores

  attr_accessible :front, :back

  validates :front, :deck, :deck_id, :user, :user_id, presence: true

  def self.next_for(user)
    Score.where(user_id: user.id).order(:score).take(5).shuffle.first
  end
end
