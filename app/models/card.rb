class Card < ActiveRecord::Base
  belongs_to :deck
  has_many :scores

  attr_accessible :front, :back

  validates :front, :deck, :deck_id, presence: true

  def self.next_for(user, deck)
    find_next = lambda do
      scores = Score.where(user_id: user.id).order(:score)
      # can the next line not better be done within active record?
      scores = scores.select { |s| s.card.deck_id = deck.id }
      if scores.empty? then nil else scores.take(5).shuffle.first.card end
    end

    card = find_next[]

    if card.nil?
      # no scores generated yet for this user/deck combo?
      Card.find_all_by_deck_id(deck.id).each do |card|
        Score.for(user, card)
      end

      card = find_next[]
    end

    card
  end
end
