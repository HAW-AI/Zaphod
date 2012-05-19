class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :cards
  has_many :collaborators
  has_many :users, through: :collaborators, source: :user

  accepts_nested_attributes_for :collaborators
  validates_associated :collaborators

  attr_accessible :title, :description

  validates :title, presence: true
end
