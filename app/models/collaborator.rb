class Collaborator < ActiveRecord::Base
  belongs_to :deck, inverse_of: :collaborators
  belongs_to :user

  validates :deck, :user, :role, presence: true
  validates_uniqueness_of :user_id, scope: [ :deck_id ]

  attr_accessible :deck_id, :user_id, :role

  ROLES = %w(owner editor viewer)
  validates_inclusion_of :role, :in => ROLES
end
