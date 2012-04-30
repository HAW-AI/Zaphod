class AddRoleToCollaborators < ActiveRecord::Migration
  def change
    add_column :collaborators, :role, :string
  end
end
