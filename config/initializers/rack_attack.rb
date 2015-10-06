class Rack::Attack
  # Throttle all requests by IP (60rpm)
  # Key: "rack::attack:#{Time.now.to_i/:period}:req/ip:#{req.ip}"
  throttle('req/ip', :limit => 20, :period => 5.minutes) do |req|
    req.ip unless req.path.starts_with?('/assets')
  end

  # Throttle search/filter query by IP (60rpm)
  throttle("search/query", :limit => 20, :period => 5.minutes) do |req|
    if req.path == '/search?q=g'
      req.ip
    end
  end

end

# Configure app to use Rack::Attack in production
Rails.application.configure do
  # Use only in production
  break unless Rails.env.production?
  config.middleware.use Rack::Attack
end
