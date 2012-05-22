class DecksController < ResourceController
  actions :create, :update, :show, :destroy

  def index
    respond_with current_user.collaborator_decks
  end

  def create
    @deck = Deck.new(params[:deck])
    @deck.set_owner(current_user.id)
    create!
  end

  def index
    # TODO only show decks of current_user
    # return everything for now
    respond_with Deck.all
  end
end
