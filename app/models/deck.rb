class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :cards

  attr_accessible :title, :description
end
