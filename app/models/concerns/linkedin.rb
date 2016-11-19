module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_API_URI = 'https://api.linkedin.com/v1'.freeze
    FIELDS = 'id,positions,public-profile-url'.freeze
    LINKEDIN_PEOPLE_URI = "#{LINKEDIN_API_URI}/people/~:(#{FIELDS})".freeze
  end

  def fetch_profile
    Rails.cache.fetch(self) do
      response = client.get("#{LINKEDIN_PEOPLE_URI}?&#{in_params}", headers)
      JSON.parse(response.body)
    end
  rescue JSON::ParserError
    {}
  end

  def fetch_positions
    positions = fetch_profile['positions']['values']
    return [] if positions.nil?
    add_start_date(positions).take(20).to_a
  rescue NoMethodError
    []
  end

  private

  def add_start_date(positions)
    positions.lazy.map do |position|
      position.tap do |obj|
        year = obj['startDate']['year']
        month = obj['startDate']['month']
        obj['startDate'] = Time.new(year, month).to_s
      end
    end
  end

  def in_params
    { oauth2_access_token: access_token, format: 'json' }.to_query
  end
end
