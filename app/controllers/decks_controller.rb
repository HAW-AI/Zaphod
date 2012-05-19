class DecksController < ResourceController
  actions :create, :update, :show

  def create
    @deck = Deck.new(params[:deck])
    create!
  end
end
