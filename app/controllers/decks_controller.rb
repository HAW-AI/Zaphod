class DecksController < ResourceController
  actions :create, :update, :show

  def index
    respond_with current_user.collaborator_decks
  end

  def create
    @deck = Deck.new(params[:deck])
    @deck.set_owner(current_user.id)
    create!
  end
end
