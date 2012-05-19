class AddDefaultsToScore < ActiveRecord::Migration
  def change
    change_column_default :scores, :score, 0.5
    change_column_default :scores, :count, 1
  end
end
