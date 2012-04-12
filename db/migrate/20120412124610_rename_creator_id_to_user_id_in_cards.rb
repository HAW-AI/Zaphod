class RenameCreatorIdToUserIdInCards < ActiveRecord::Migration
  def change
    rename_column :cards, :creator_id, :user_id
  end
end
