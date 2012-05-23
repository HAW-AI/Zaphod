class Score < ActiveRecord::Base
  belongs_to :user
  belongs_to :card

  validates :user, :card, :score, :count, presence: true

  attr_accessible :user_id, :card_id

  def self.for(user, card)
    find_or_create_by_card_id_and_user_id(card.id, user.id)
  end

  def known
    self.score +=(((self.score*0.025)-((Math.sqrt(self.score*self.score))*0.025))*(-1))+1
    self.save
  end

  def unknown
    self.score +=(((self.score*0.025)+((Math.sqrt(self.score*self.score))*0.025))*(-1))-1
    self.save
  end
end
