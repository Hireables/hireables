module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_BASE_URI = "https://api.linkedin.com/v1".freeze
  end

  def fetch_positions
    agent = Sawyer::Agent.new(
      "#{LINKEDIN_BASE_URI}/people/~:(id,positions)?&#{linkedin_query_params}",
      faraday: client
    ) do |http|
      http.headers['content-type'] = 'application/json'
    end
    root = agent.start
    root.data
  end

  private

  def linkedin_query_params
    {
      oauth2_access_token: access_token,
      format: 'json'
    }.to_query
  end
end
