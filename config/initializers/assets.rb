Rails.application.config.assets.version = '1.0'

# Add folder with webpack generated assets to assets.paths
Rails.application.config.assets.paths << Rails.root.join(
  'app',
  'assets',
  'webpack'
)
