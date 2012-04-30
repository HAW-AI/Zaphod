class CardsController < ResourceController
	belongs_to :deck
	action :create, :update

	def create
		@card = Card.new(params[:card])
		@card.deck = @deck
		create!
	end

  def next
    respond_with Card.next_for(current_user)
  end

  def update
		@card = Card.find(params[:id])
    score = Score.for(current_user, @card)
    if [:known, :unkown].include? params[:event]
      score.send(params[:event])
    end
    respond_with @card
  end
end
