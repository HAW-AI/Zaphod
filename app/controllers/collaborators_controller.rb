class CollaboratorsController < ResourceController
  respond_to :json

	belongs_to :deck, shallow: true
	actions :create, :update, :show, :destroy

  def index
    @deck = Deck.find(params[:deck_id])
    @collaborators = []
    if params[:role]
      if params[:role] == "owner"
        @collaborators = @deck.owner.to_a
      elsif params[:role] == "editor"
        @collaborators = @deck.editors
      end
    else
      @collaborators = @deck.collaborators
    end

    respond_with @collaborators
  end

  def update
    @deck = Deck.find(params[:deck_id])

    # add the list of user_ids as the given role to the decks collaborators
    if params[:role] && params[:role] != "owner" && params[:user_ids] && !params[:user_ids].empty?
      if params[:role] == "editor"
        params[:user_ids].each { |u| @deck.add_editor(u) }
      end
    end

    respond_with @deck.editors
  end

  def destroy
    @deck = Deck.find(params[:deck_id])
    #
    # remove the list of user_ids for the given role from the decks collaborators
    if params[:role] && params[:role] != "owner" && params[:user_ids] && !params[:user_ids].empty?
      if params[:role] == "editor"
        params[:user_ids].each { |u| @deck.remove_editor(u) }
      end
    end

    respond_with @deck.editors
  end

end
