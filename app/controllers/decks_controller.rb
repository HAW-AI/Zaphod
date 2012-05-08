class DecksController < ResourceController
  actions :create, :update, :show

  def create
    @deck = Deck.new(params[:deck])
    @deck.user = @user
    create!
  end

  def index
    # TODO only show decks of current_user
    # return everything for now
    respond_with Deck.all
  end
end
