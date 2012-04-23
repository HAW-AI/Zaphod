class CardsController < ResourceController
	belongs_to :deck
	action :create

	def create
		@card = Card.new(params[:card])
		@card.deck = @deck
		create!
	end
end
