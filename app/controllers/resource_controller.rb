class ResourceController < ApplicationController
  respond_to :json
  inherit_resources
end