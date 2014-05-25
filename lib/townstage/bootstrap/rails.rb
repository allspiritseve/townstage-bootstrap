module Townstage::Bootstrap
  class Engine < ::Rails::Engine
    config.after_initialize do
      Rails.application.config.assets.paths << File.expand_path('.', File.dirname(__FILE__))
    end
  end
end
