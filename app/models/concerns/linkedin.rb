module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_API_URI = 'https://api.linkedin.com/v1'.freeze
    LINKEDIN_PEOPLE_URI = "#{LINKEDIN_API_URI}/people/~:(id,positions)".freeze
  end

  def fetch_positions
    Rails.cache.fetch(self) do
      agent = initialize_agent("#{LINKEDIN_PEOPLE_URI}?&#{in_params}")
      root = agent.start
      positions = root.data.positions
      return [] if positions.nil?
      positions.values.take(20)
    end

  rescue NoMethodError
    []
  end

  private

  def in_params
    {
      oauth_token: access_token,
      format: 'json'
    }.to_query
  end
end
