class Card < ActiveRecord::Base
  belongs_to :deck
  has_many :scores

  attr_accessible :front, :back

  validates :front, :deck, :deck_id, presence: true

  def self.next_for(user, deck)
    scores = scores_for(user, deck)

    if scores.count != deck.cards.count
      # create scores for new cards
      deck.cards.each { |c| Score.for(user, c) }
      scores = scores_for(user, deck)
    end

    scores.order("score ASC").take(5).shuffle.first.card unless scores.empty?
  end


  private

  def self.scores_for(user, deck)
    Score.joins(:card)
         .where(user_id: user.id, cards: { deck_id: deck.id })
         .order(:score)
  end
end
