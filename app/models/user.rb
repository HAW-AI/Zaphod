class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :confirmable, :recoverable
  
  attr_accessible :username, :email
  validates :username, :email, presence: true
end
