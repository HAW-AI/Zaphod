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

  after_create :reset_authentication_token

  def reset_authentication_token
    self.authentication_token = Sorcery::Model::TemporaryToken.generate_random_token
    self.save
  end

  def as_json(opts={})
    { id: id, username: username, email: email }
  end
end
