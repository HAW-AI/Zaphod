class User < ActiveRecord::Base
  authenticates_with_sorcery!
  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :remember_me

  validates :username, :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create

  has_many :cards
  has_many :collaborators
  has_many :collaborator_decks, through: :collaborators, source: :deck
  has_many :scores

  after_create :generate_authentication_token

  private

  def generate_authentication_token
    authentication_token = "valid_auth_token" + id.to_s
    save
  end
end
