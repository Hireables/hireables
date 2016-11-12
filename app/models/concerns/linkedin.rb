module Linkedin
  extend ActiveSupport::Concern

  included do
    LINKEDIN_API_URI = 'https://api.linkedin.com/v1'.freeze
    LINKEDIN_PEOPLE_URI = "#{LINKEDIN_API_URI}/people/~:(id,positions)".freeze
  end

  def fetch_positions
    Rails.cache.fetch(self) do
      response = client.get("#{LINKEDIN_PEOPLE_URI}?&#{in_params}", headers)
      positions = JSON.parse(response.body)['positions']['values']
      return [] if positions.nil?
      add_start_date(positions).take(20).to_a
    end

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
    { oauth_token: access_token, format: 'json' }.to_query
  end
end
