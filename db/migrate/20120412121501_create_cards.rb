class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :creator_id
      t.text :front
      t.text :back
      t.integer :deck_id

      t.timestamps
    end
  end
end
