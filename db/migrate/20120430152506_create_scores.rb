class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :card_id
      t.integer :count
      t.float :score

      t.timestamps
    end
  end
end
