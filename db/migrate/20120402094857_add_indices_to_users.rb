class AddIndicesToUsers < ActiveRecord::Migration
  def change
    add_index :users, :unlock_token,         :unique => true
    add_index :users, :authentication_token, :unique => true
  end
end
