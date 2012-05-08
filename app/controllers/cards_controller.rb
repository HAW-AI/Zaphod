class CardsController < ResourceController
	belongs_to :deck, shallow: true
	actions :create, :update, :show

	def create
		@card = Card.new(params[:card])
		@card.deck = @deck
		create!
	end

  def next
    respond_with Card.next_for(current_user)
  end

  def update
    # update score
		@card = Card.find(params[:id])
    score = Score.for(current_user, @card)
    if [:known, :unkown].include? params[:event]
      score.send(params[:event])
    end

    # update rest
    super
  end


  def index
    respond_with Card.find_by_deck_id(params[:deck_id])
  end
end
