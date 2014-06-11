module Townstage
  module Bootstrap
    class Engine < ::Rails::Engine
      initializer :assets do |config|
        Rails.application.config.assets.paths << root.join('sass')
      end
    end
  end
end
