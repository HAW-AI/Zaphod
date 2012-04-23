class CardsController < ResourceController
  belongs_to :deck

  def create
    debugger.log parent?
    @card = @deck.cards.build
    @card.user = current_user
    create!
  end
end
