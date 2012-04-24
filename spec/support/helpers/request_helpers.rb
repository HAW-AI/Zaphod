module RequestHelpers
  def do_create(data = {})
    post :create, data
  end

  def do_update(data={})
    post :update, data
  end

  def json_create(data={})
  	do_create data.merge(format: :json)
  end

  def json_update(data={})
  	do_update data.merge(format: :json)
  end
end
