class CardsController < ResourceController
	belongs_to :deck
	action :create, :update

	def create
		@card = Card.new(params[:card])
		@card.deck = @deck
		create!
	end

  def next
    respond_with Card.first
  end
end
