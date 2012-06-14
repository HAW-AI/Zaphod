class CardsController < ResourceController
	belongs_to :deck, shallow: true
	actions :create, :update, :show, :destroy

	def create
		@card = Card.new(params[:card])

    # dont use @deck ! it's lazy!
		@card.deck = parent

		create!
	end

  def next
    respond_with Card.next_for(current_user, parent)
  end

  def update
    # update score
		@card = Card.find(params[:id])
    score = Score.for(current_user, @card)
    if params[:event] && [:known, :unknown].include?(params[:event].to_sym)
      score.send(params[:event])
    end

    # update rest
    super
  end


  def index
    respond_with Card.find_all_by_deck_id(params[:deck_id])
  end
end
