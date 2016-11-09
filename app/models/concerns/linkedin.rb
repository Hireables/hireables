module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_API_URI = 'https://api.linkedin.com/v1'.freeze
    LINKEDIN_PEOPLE_URI = "#{LINKEDIN_API_URI}/people/~:(id,positions)".freeze
  end

  def fetch_positions
    agent = initialize_agent("#{LINKEDIN_PEOPLE_URI}?&#{linkedin_query_params}")
    root = agent.start
    root.data.positions.values
  end

  private

  def linkedin_query_params
    {
      oauth2_access_token: access_token,
      format: 'json'
    }.to_query
  end
end
