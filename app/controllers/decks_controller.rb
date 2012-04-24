class DecksController < ResourceController
  belongs_to :user
  action :create, :update

  def create
    @deck = Deck.new(params[:deck])
    @deck.user = @user
    create!
  end
end
