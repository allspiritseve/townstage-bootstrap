require 'sinatra/base'

$:.unshift(File.expand_path('lib', File.dirname(__FILE__)))

module Townstage
  class Example < Sinatra::Base
    get '/' do
      erb :index
    end
  end
end
