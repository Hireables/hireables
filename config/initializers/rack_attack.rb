class Rack::Attack
  # Throttle all requests by IP (30rpm)
  # Key: "rack::attack:#{Time.now.to_i/:period}:req/ip:#{req.ip}"
  throttle('req/ip', limit: 150, period: 5.minutes) do |req|
    req.ip unless req.path.starts_with?('/assets')
  end

  # Prevent Brute-Force Login Attacks
  throttle('developers/auth/github', limit: 5, period: 5.minutes) do |req|
    if req.path == '/developers/auth/github'
      req.ip
    end
  end

  # Prevent Brute-Force Login Attacks on devise routes
  throttle('employers/sign_in', limit: 5, period: 5.minutes) do |req|
    if req.path == '/employers/sign_in' && req.post?
      req.ip
    end
  end

  # Prevent Brute-Force Signup Attacks on devise routes
  throttle('employers/sign_up', limit: 5, period: 5.minutes) do |req|
    if req.path == '/employers/sign_up' && req.post?
      req.ip
    end
  end

  # Prevent Brute-Force forgot password Attacks on devise routes
  throttle('employers/password/new', limit: 1, period: 5.minutes) do |req|
    if req.path == '/employers/password/new' && req.post?
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
