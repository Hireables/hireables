class Rack::Attack
  # Throttle all requests by IP (60rpm)
  # Key: "rack::attack:#{Time.now.to_i/:period}:req/ip:#{req.ip}"
  throttle('req/ip', :limit => 1000, :period => 1.minute) do |req|
    req.ip unless req.path.starts_with?('/assets')
  end

end

# Configure app to use Rack::Attack in production
Rails.application.configure do
  # Use only in production
  break unless Rails.env.production?
  config.middleware.use Rack::Attack
end
