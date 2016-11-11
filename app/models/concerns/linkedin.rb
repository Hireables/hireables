module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_API_URI = 'https://api.linkedin.com/v1'.freeze
    LINKEDIN_PEOPLE_URI = "#{LINKEDIN_API_URI}/people/~:(id,positions,public-profile-url)".freeze
  end

  def fetch_positions
    Rails.cache.fetch(self) do
      agent = initialize_agent("#{LINKEDIN_PEOPLE_URI}?&#{in_query_params}")
      root = agent.start
      root.data.positions.values
                              .lazy
                              .sort_by{|item| [item.startDate.year, item.summary]}
                              .reverse!
                              .to_a
    end

  rescue NoMethodError
    [].to_json
  end

  private

  def in_query_params
    {
      oauth_token: access_token,
      format: 'json'
    }.to_query
  end
end
