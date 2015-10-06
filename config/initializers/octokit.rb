# Setup github client with private access token for now to play
$github_client = Octokit::Client.new(:access_token => ENV["github_access_token"])