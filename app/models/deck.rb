class Deck < ActiveRecord::Base
  has_many :cards
  has_many :collaborators, autosave: true, inverse_of: :deck
  has_many :users, through: :collaborators, source: :user

  accepts_nested_attributes_for :collaborators
  validates_associated :collaborators

  attr_accessible :title, :description

  validates :title, presence: true

  def set_owner(user_id)
    add_user(user_id, "owner")
  end

  def add_editor(user_id)
    unless owner.id == user_id
      add_user(user_id, "editor")
      save
    end
  end

  def remove_editor(user_id)
    collaborators.where(user_id: user_id, role: "editor").first.destroy
  end

  # Returns: Deck -> User
  def owner
    collaborators.where(role: "owner").first.user
  end

  # Returns: Deck -> Array<User>
  def editors
    editor_collaborators = collaborators.where(role: "editor").all
    if editor_collaborators
      editor_collaborators.map {|e| e.user}
    else
      []
    end
  end

  private

  def add_user(user_id, role)
    collaborators.build({
      user_id: user_id,
      role: role
    })
  end
end
