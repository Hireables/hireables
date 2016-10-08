class ApplicationController < ActionController::Base
  include Tokenizeable
  protect_from_forgery with: :exception
end
