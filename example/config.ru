#\ -s puma

require 'rack'
require 'sass/plugin/rack'

use Sass::Plugin::Rack
Sass::Plugin.options[:template_location] = './sass'
Sass::Plugin.options[:css_location] = './public/assets'

require './app'
run Townstage::Example.new
