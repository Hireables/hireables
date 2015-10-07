# Setup Faraday cache
stack = Faraday::RackBuilder.new do |builder|
  builder.use Faraday::HttpCache, shared_cache: false, store: Rails.cache
  builder.response :logger
  builder.use Octokit::Response::RaiseError
  builder.adapter Faraday.default_adapter
end

# Setup caching middleware
Octokit.middleware = stack

# Setup github client with private access token for now to play
$github_client = Octokit::Client.new(:access_token => ENV["github_access_token"])