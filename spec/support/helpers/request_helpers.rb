module RequestHelpers
  def do_create(data = {})
    post :create, data
  end

  def do_update(data={})
    post :update, data
  end
end
