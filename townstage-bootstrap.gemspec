# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'townstage/version'

Gem::Specification.new do |spec|
  spec.name          = "townstage-bootstrap"
  spec.version       = Townstage::VERSION
  spec.authors       = ["Cory Kaufman-Schofield"]
  spec.email         = ["cory@corykaufman.com"]
  spec.description   = "Shared assets for Townstage Productions projects"
  spec.summary       = "Shared assets for Townstage Productions projects"
  spec.homepage      = "https://townstage.com"
  spec.license       = "MIT"

  spec.files          = Dir["lib/**/*"] + Dir["vendor/**/*"] + Dir["app/**/*"] + ["Rakefile", "README.md"]
  # spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency 'railties'

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "puma"
end
