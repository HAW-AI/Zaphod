class ResourceController < ApplicationController
  respond_to :json
  inherit_resources
  before_filter :require_login
end
