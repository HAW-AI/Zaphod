class Score < ActiveRecord::Base
  belongs_to :user
  belongs_to :card

  validates :user, :card, :score, :count, presence: true

  def self.for(user, card)
    find_or_create_by_card_id_and_user_id(card.id, user.id)
  end

  def known
    calculate(0)
  end

  def unknown
    calculate(1)
  end

  private
  
  def calculate(choice)
    # count is at least 1
    self.score = (score / count) + (choice / count)
    self.count += 1
    save
  end
end
