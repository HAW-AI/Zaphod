class DecksController < ResourceController
  actions :create, :update, :show

  def create
    @deck = Deck.new(params[:deck])
    @deck.user = @user
    create!
  end
end
