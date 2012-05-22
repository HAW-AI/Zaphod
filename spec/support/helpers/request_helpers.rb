module RequestHelpers
  def do_get_index(data = {})
    get :index, data
  end

  def do_get_show(data = {})
    get :show, data
  end

  def do_create(data = {})
    post :create, data
  end

  def do_update(data={})
    put :update, data
  end

  def do_destroy(data={})
    delete :destroy, data
  end

  def json_get_index(data={})
    do_get_index data.merge(format: :json)
  end

  def json_get_show(data={})
    do_get_show data.merge(format: :json)
  end

  def json_create(data={})
  	do_create data.merge(format: :json)
  end

  def json_update(data={})
  	do_update data.merge(format: :json)
  end

  def json_destroy(data={})
    do_destroy data.merge(format: :json)
  end
end
