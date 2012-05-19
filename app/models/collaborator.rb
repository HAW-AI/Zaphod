class Collaborator < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user

  validates :deck, :user, :role, presence: true
  validate :role_in_roles

  attr_accessible :deck_id, :user_id, :role

  ROLES = %w(owner editor viewer)

  private
  def role_in_roles
    ROLES.include?(role)
  end
end
