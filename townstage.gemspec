# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'townstage/version'

Gem::Specification.new do |spec|
  spec.name          = "townstage"
  spec.version       = Townstage::VERSION
  spec.authors       = ["Cory Kaufman-Schofield"]
  spec.email         = ["cory@corykaufman.com"]
  spec.description   = "Shared assets for Townstage and Backstage"
  spec.summary       = "Shared assets for Townstage and Backstage"
  spec.homepage      = "https://townstage.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency 'railties'

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
