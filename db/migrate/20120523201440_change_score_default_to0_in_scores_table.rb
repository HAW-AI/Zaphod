class ChangeScoreDefaultTo0InScoresTable < ActiveRecord::Migration
  def change
    change_column_default :scores, :score, 0
  end
end
