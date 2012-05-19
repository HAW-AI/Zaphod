class DropUserIdFromDecks < ActiveRecord::Migration
  remove_column :decks, :user_id
end
