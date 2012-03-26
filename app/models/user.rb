class User < ActiveRecord::Base
  authenticates_with_sorcery!
  attr_accessible :username, :email
  validates :username, :email, presence: true
end
